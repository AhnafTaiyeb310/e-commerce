from django.db.models import Count, Avg
from django.db.models.query import QuerySet
from django.shortcuts import get_object_or_404

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics, status
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from .permissions import IsAdminOrReadOnly, ViewCustomerHistoryPermission
from .pagination import DefaultPagination

from .filters import ProductFilter, ProductVariantFilter
from .models import (
    AttributeType,
    AttributeValue,
    Cart,
    CartItem,
    Category,
    Collection,
    Customer,
    Order,
    OrderItem,
    Product,
    ProductImage,
    ProductType,
    ProductVariant,
    Review,
)
from .serializers import (
    AddCartItemSerializer,
    AttributeTypeSerializer,
    AttributeValueSerializer,
    CartItemSerializer,
    CartSerializer,
    CategorySerializer,
    CollectionSerializer,
    CreateOrderSerializer,
    CustomerSerializer,
    OrderSerializer,
    ProductImageSerializer,
    ProductSerializer,
    ProductTypeSerializer,
    ProductVariantSerializer,
    ReviewSerializer,
    SimpleCategorySerializer,
    UpdateCartItemSerializer,
    UpdateOrderSerializer,
)


# ─────────────────────────────────────────────────────────────────────────────
# CATEGORY
# ─────────────────────────────────────────────────────────────────────────────

class CategoryViewSet(ModelViewSet):
    """
    Full CRUD for categories. Top-level categories are returned by default.
    Use ?parent=<id> to list children of a specific category.
    """
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        qs = Category.objects.annotate(product_count=Count('products'))
        parent_id = self.request.query_params.get('parent')
        if parent_id == 'root':
            qs = qs.filter(parent__isnull=True)
        elif parent_id:
            qs = qs.filter(parent_id=parent_id)
        return qs.prefetch_related('children').order_by('position', 'name')


class CategoryProductListView(generics.ListAPIView):
    """
    Returns all active products belonging to a category AND all
    its descendant categories (sub-categories at any depth).
    """
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProductFilter
    pagination_class = DefaultPagination
    search_fields = ['title', 'description', 'brand']
    ordering_fields = ['base_price', 'created_at', 'title']

    def get_queryset(self):
        category = get_object_or_404(
            Category, slug=self.kwargs['category_slug'], is_active=True
        )
        descendant_ids = category.get_all_descendant_ids()
        category_ids = [category.id] + descendant_ids

        return (
            Product.objects
            .filter(category__id__in=category_ids, is_active=True)
            .select_related('category', 'product_type', 'collection')
            .prefetch_related(
                'images',
                'variants__attribute_values__attribute_type',
                'variants__images',
            )
            .annotate(
                review_count=Count('reviews'),
                average_rating=Avg('reviews__rating'),
            )
            .order_by('-created_at')
        )

    def list(self, request, *args, **kwargs):
        category = get_object_or_404(
            Category, slug=self.kwargs['category_slug'], is_active=True
        )
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)

        category_data = {
            'name': category.name,
            'slug': category.slug,
            'full_path': category.get_full_path,
            'description': category.description,
        }

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            paginated = self.get_paginated_response(serializer.data)
            paginated.data['category'] = category_data
            return paginated

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'category': category_data,
            'products': serializer.data,
            'total_count': queryset.count(),
        })


# ─────────────────────────────────────────────────────────────────────────────
# COLLECTION
# ─────────────────────────────────────────────────────────────────────────────

class CollectionViewSet(ModelViewSet):
    queryset = Collection.objects.annotate(products_count=Count('products')).all()
    serializer_class = CollectionSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [SearchFilter]
    search_fields = ['title']

    def destroy(self, request, *args, **kwargs):
        if Product.objects.filter(collection_id=kwargs['pk']).exists():
            return Response(
                {'error': 'Collection cannot be deleted because it includes one or more products.'},
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )
        return super().destroy(request, *args, **kwargs)


# ─────────────────────────────────────────────────────────────────────────────
# PRODUCT TYPE & ATTRIBUTES
# ─────────────────────────────────────────────────────────────────────────────

class ProductTypeViewSet(ModelViewSet):
    serializer_class = ProductTypeSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        return ProductType.objects.prefetch_related(
            'attribute_types__values'
        ).all()


class AttributeTypeViewSet(ModelViewSet):
    serializer_class = AttributeTypeSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        qs = AttributeType.objects.prefetch_related('values')
        product_type_id = self.request.query_params.get('product_type')
        if product_type_id:
            qs = qs.filter(product_types__id=product_type_id)
        return qs


class AttributeValueViewSet(ModelViewSet):
    serializer_class = AttributeValueSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['value']

    def get_queryset(self):
        return AttributeValue.objects.filter(
            attribute_type_id=self.kwargs['attribute_type_pk']
        ).select_related('attribute_type')

    def get_serializer_context(self):
        return {**super().get_serializer_context(), 'attribute_type_id': self.kwargs['attribute_type_pk']}

    def perform_create(self, serializer):
        serializer.save(attribute_type_id=self.kwargs['attribute_type_pk'])


# ─────────────────────────────────────────────────────────────────────────────
# PRODUCT
# ─────────────────────────────────────────────────────────────────────────────

class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProductFilter
    pagination_class = DefaultPagination
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ['title', 'description', 'brand']
    ordering_fields = ['base_price', 'created_at', 'title']

    def get_queryset(self):
        return (
            Product.objects
            .select_related('category', 'product_type', 'collection')
            .prefetch_related(
                'images',
                'variants__attribute_values__attribute_type',
                'variants__images',
                'promotions',
            )
            .annotate(
                review_count=Count('reviews'),
                average_rating=Avg('reviews__rating'),
            )
            .all()
        )

    def get_serializer_context(self):
        return {'request': self.request}

    def destroy(self, request, *args, **kwargs):
        if OrderItem.objects.filter(product_id=kwargs['pk']).exists():
            return Response(
                {'error': 'Product cannot be deleted because it is associated with an order item.'},
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )
        return super().destroy(request, *args, **kwargs)


# ─────────────────────────────────────────────────────────────────────────────
# PRODUCT VARIANT
# ─────────────────────────────────────────────────────────────────────────────

class ProductVariantViewSet(ModelViewSet):
    serializer_class = ProductVariantSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductVariantFilter

    def get_queryset(self):
        return (
            ProductVariant.objects
            .filter(product_id=self.kwargs['product_pk'])
            .prefetch_related('attribute_values__attribute_type', 'images')
        )

    def perform_create(self, serializer):
        serializer.save(product_id=self.kwargs['product_pk'])


# ─────────────────────────────────────────────────────────────────────────────
# PRODUCT IMAGE
# ─────────────────────────────────────────────────────────────────────────────

class ProductImageViewSet(ModelViewSet):
    serializer_class = ProductImageSerializer

    def get_serializer_context(self):
        return {'product_id': self.kwargs['product_pk']}

    def get_queryset(self):
        return ProductImage.objects.filter(product_id=self.kwargs['product_pk'])


# ─────────────────────────────────────────────────────────────────────────────
# REVIEW
# ─────────────────────────────────────────────────────────────────────────────

class ReviewViewSet(ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        return (
            Review.objects
            .filter(product_id=self.kwargs['product_pk'])
            .select_related('customer__user')
            .order_by('-date')
        )

    def get_serializer_context(self):
        customer = None
        if self.request.user.is_authenticated:
            try:
                customer = Customer.objects.get(user=self.request.user)
            except Customer.DoesNotExist:
                pass
        return {
            'product_id': self.kwargs['product_pk'],
            'customer': customer,
        }


# ─────────────────────────────────────────────────────────────────────────────
# CART
# ─────────────────────────────────────────────────────────────────────────────

class CartViewSet(
    CreateModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = Cart.objects.prefetch_related(
        'items__product',
        'items__variant__attribute_values__attribute_type',
    ).all()
    serializer_class = CartSerializer


class CartItemViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AddCartItemSerializer
        elif self.request.method == 'PATCH':
            return UpdateCartItemSerializer
        return CartItemSerializer

    def get_serializer_context(self):
        return {'cart_id': self.kwargs['cart_pk']}

    def get_queryset(self):
        return (
            CartItem.objects
            .filter(cart_id=self.kwargs['cart_pk'])
            .select_related('product', 'variant')
            .prefetch_related('variant__attribute_values__attribute_type')
        )


# ─────────────────────────────────────────────────────────────────────────────
# CUSTOMER
# ─────────────────────────────────────────────────────────────────────────────

class CustomerViewSet(ModelViewSet):
    queryset = Customer.objects.select_related('user').all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAdminUser]

    @action(detail=True, permission_classes=[ViewCustomerHistoryPermission])
    def history(self, request, pk):
        return Response('ok')

    @action(detail=False, methods=['GET', 'PUT', 'PATCH'], permission_classes=[IsAuthenticated])
    def me(self, request):
        customer = get_object_or_404(Customer, user_id=request.user.id)
        if request.method == 'GET':
            serializer = CustomerSerializer(customer)
            return Response(serializer.data)
        serializer = CustomerSerializer(customer, data=request.data, partial=request.method == 'PATCH')
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


# ─────────────────────────────────────────────────────────────────────────────
# ORDER
# ─────────────────────────────────────────────────────────────────────────────

class OrderViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete', 'head', 'options']

    def get_permissions(self):
        if self.request.method in ['PATCH', 'DELETE']:
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        serializer = CreateOrderSerializer(
            data=request.data,
            context={'user_id': self.request.user.id},
        )
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateOrderSerializer
        elif self.request.method == 'PATCH':
            return UpdateOrderSerializer
        return OrderSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return (
                Order.objects
                .select_related('customer__user', 'shipping_address')
                .prefetch_related(
                    'items__product',
                    'items__variant__attribute_values__attribute_type',
                )
                .all()
            )
        customer_id = Customer.objects.only('id').get(user_id=user.id)
        return (
            Order.objects
            .filter(customer_id=customer_id)
            .prefetch_related(
                'items__product',
                'items__variant__attribute_values__attribute_type',
            )
        )
