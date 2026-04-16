from django.core.cache import cache
from django.db.models import Count, Avg, Prefetch
from django.db.models.query import QuerySet
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers
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
    Address,
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
    AddressSerializer,
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
    ProductListSerializer,
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

CATEGORY_CACHE_TTL = 5 * 60  # 5 minutes
COLLECTION_CACHE_TTL = 5 * 60


@method_decorator(cache_page(CATEGORY_CACHE_TTL, key_prefix="categories"), name="list")
@method_decorator(vary_on_headers("Accept", "Accept-Language"), name="list")
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

    def _bust_cache(self):
        """Invalidate all category list cache entries after any write."""
        cache.delete_pattern("*categories*") if hasattr(cache, "delete_pattern") else cache.clear()

    def perform_create(self, serializer):
        super().perform_create(serializer)
        self._bust_cache()

    def perform_update(self, serializer):
        super().perform_update(serializer)
        self._bust_cache()

    def perform_destroy(self, instance):
        super().perform_destroy(instance)
        self._bust_cache()


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
                Prefetch(
                    'images',
                    queryset=ProductImage.objects.only(
                        'id', 'product_id', 'image', 'is_primary', 'position'
                    ),
                ),
            )
            .annotate(
                review_count=Count('reviews'),
                average_rating=Avg('reviews__rating'),
            )
            .order_by('-created_at')
        )

    def get_serializer_class(self):
        return ProductListSerializer

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

@method_decorator(cache_page(COLLECTION_CACHE_TTL, key_prefix="collections"), name="list")
@method_decorator(vary_on_headers("Accept", "Accept-Language"), name="list")
class CollectionViewSet(ModelViewSet):
    queryset = Collection.objects.annotate(products_count=Count('products')).all()
    serializer_class = CollectionSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [SearchFilter]
    search_fields = ['title']

    def _bust_cache(self):
        """Invalidate all collection list cache entries after any write."""
        cache.delete_pattern("*collections*") if hasattr(cache, "delete_pattern") else cache.clear()

    def perform_create(self, serializer):
        super().perform_create(serializer)
        self._bust_cache()

    def perform_update(self, serializer):
        super().perform_update(serializer)
        self._bust_cache()

    def destroy(self, request, *args, **kwargs):
        if Product.objects.filter(collection_id=kwargs['pk']).exists():
            return Response(
                {'error': 'Collection cannot be deleted because it includes one or more products.'},
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )
        result = super().destroy(request, *args, **kwargs)
        self._bust_cache()
        return result


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

    def get_serializer_class(self):
        """
        Use the slim ProductListSerializer for list/search endpoints.
        The full ProductSerializer (with variants, product type tree, etc.) is
        reserved for retrieve and write operations where all fields are needed.
        """
        if self.action == 'list':
            return ProductListSerializer
        return ProductSerializer

    def get_queryset(self):
        if self.action == 'list':
            # Slim query for list: only fetch what ProductListSerializer needs.
            # - No variants prefetch (not serialized on list)
            # - No product_type tree (not serialized on list)
            # - Only images prefetch for primary_image field
            return (
                Product.objects
                .filter(is_active=True)
                .select_related('category')
                .prefetch_related(
                    Prefetch(
                        'images',
                        queryset=ProductImage.objects.only(
                            'id', 'product_id', 'image', 'is_primary', 'position'
                        ),
                    ),
                )
                .annotate(
                    review_count=Count('reviews'),
                    average_rating=Avg('reviews__rating'),
                )
            )
        # Full query for retrieve/create/update: all nested relations needed.
        return (
            Product.objects
            .filter(is_active=True)
            .select_related('category', 'product_type', 'collection')
            .prefetch_related(
                Prefetch(
                    'images',
                    queryset=ProductImage.objects.only(
                        'id', 'product_id', 'image', 'alt_text', 'is_primary',
                        'position', 'variant_id', 'upload_status',
                    ),
                ),
                Prefetch(
                    'variants',
                    # select_related('product') is required so variant.price
                    # doesn't lazy-load the parent product when price_override is None.
                    queryset=ProductVariant.objects.select_related('product').prefetch_related(
                        'attribute_values__attribute_type',
                        Prefetch(
                            'images',
                            queryset=ProductImage.objects.only(
                                'id', 'product_id', 'image', 'alt_text',
                                'is_primary', 'position', 'variant_id', 'upload_status',
                            ),
                        ),
                    ),
                ),
                'promotions',
                'product_type__attribute_types__values',
            )
            .annotate(
                review_count=Count('reviews'),
                average_rating=Avg('reviews__rating'),
            )
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
            # select_related('product') is critical: the variant.price property
            # falls back to self.product.base_price when price_override is None,
            # which triggers a lazy DB hit without this.
            .select_related('product')
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
# ADDRESS
# ─────────────────────────────────────────────────────────────────────────────

class AddressViewSet(ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(customer__user_id=self.request.user.id)

    def get_serializer_context(self):
        return {'user_id': self.request.user.id}


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
