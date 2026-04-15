from decimal import Decimal

from django.db import transaction
from rest_framework import serializers

from .signals.signals import order_created
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


# ─────────────────────────────────────────────────────────────────────────────
# CATEGORY
# ─────────────────────────────────────────────────────────────────────────────

class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    product_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Category
        fields = [
            'id', 'name', 'slug', 'description', 'image_url',
            'parent', 'position', 'is_active', 'children', 'product_count',
        ]
        read_only_fields = ['slug']

    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

    def get_children(self, obj):
        """Return direct children (one level deep for list views)."""
        children = obj.children.filter(is_active=True).order_by('position', 'name')
        return SimpleCategorySerializer(children, many=True).data

    def create(self, validated_data):
        import os, uuid
        from django.conf import settings
        from .tasks import upload_image_to_cloudinary_task

        image_file = validated_data.pop('image', None)
        instance = Category.objects.create(upload_status='P', **validated_data)

        if image_file:
            tmp_dir = os.path.join(settings.BASE_DIR, 'tmp_uploads')
            os.makedirs(tmp_dir, exist_ok=True)
            ext = os.path.splitext(image_file.name)[1]
            tmp_path = os.path.join(tmp_dir, f"{uuid.uuid4()}{ext}")
            with open(tmp_path, 'wb') as f:
                for chunk in image_file.chunks():
                    f.write(chunk)
            upload_image_to_cloudinary_task.delay('store', 'Category', instance.id, 'image', tmp_path)

        return instance


class SimpleCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'image']


# ─────────────────────────────────────────────────────────────────────────────
# COLLECTION
# ─────────────────────────────────────────────────────────────────────────────

class CollectionSerializer(serializers.ModelSerializer):
    products_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Collection
        fields = ['id', 'title', 'slug', 'description', 'image_url', 'is_active', 'products_count']
        read_only_fields = ['slug']

    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

    def create(self, validated_data):
        import os, uuid
        from django.conf import settings
        from .tasks import upload_image_to_cloudinary_task

        image_file = validated_data.pop('image', None)
        instance = Collection.objects.create(upload_status='P', **validated_data)

        if image_file:
            tmp_dir = os.path.join(settings.BASE_DIR, 'tmp_uploads')
            os.makedirs(tmp_dir, exist_ok=True)
            ext = os.path.splitext(image_file.name)[1]
            tmp_path = os.path.join(tmp_dir, f"{uuid.uuid4()}{ext}")
            with open(tmp_path, 'wb') as f:
                for chunk in image_file.chunks():
                    f.write(chunk)
            upload_image_to_cloudinary_task.delay('store', 'Collection', instance.id, 'image', tmp_path)

        return instance


# ─────────────────────────────────────────────────────────────────────────────
# ATTRIBUTES
# ─────────────────────────────────────────────────────────────────────────────

class AttributeValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttributeValue
        fields = ['id', 'attribute_type', 'value', 'color_hex', 'position']


class AttributeTypeSerializer(serializers.ModelSerializer):
    values = AttributeValueSerializer(many=True, read_only=True)

    class Meta:
        model = AttributeType
        fields = ['id', 'name', 'slug', 'values']
        read_only_fields = ['slug']


# ─────────────────────────────────────────────────────────────────────────────
# PRODUCT TYPE
# ─────────────────────────────────────────────────────────────────────────────

class ProductTypeSerializer(serializers.ModelSerializer):
    attribute_types = AttributeTypeSerializer(many=True, read_only=True)

    class Meta:
        model = ProductType
        fields = ['id', 'name', 'slug', 'has_variants', 'attribute_types']
        read_only_fields = ['slug']


# ─────────────────────────────────────────────────────────────────────────────
# PRODUCT IMAGE
# ─────────────────────────────────────────────────────────────────────────────

class ProductImageSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        import os
        import uuid
        from django.conf import settings
        from .tasks import upload_image_to_cloudinary_task

        product_id = self.context['product_id']
        image_file = validated_data.pop('image', None)
        
        # Create empty/placeholder ProductImage with PENDING status
        instance = ProductImage.objects.create(
            product_id=product_id, 
            upload_status='P', 
            **validated_data
        )

        if image_file:
            tmp_dir = os.path.join(settings.BASE_DIR, 'tmp_uploads')
            os.makedirs(tmp_dir, exist_ok=True)
            
            ext = os.path.splitext(image_file.name)[1]
            tmp_path = os.path.join(tmp_dir, f"{uuid.uuid4()}{ext}")
            
            with open(tmp_path, 'wb') as f:
                for chunk in image_file.chunks():
                    f.write(chunk)
            
            # Fire Async Celery Task
            upload_image_to_cloudinary_task.delay(
                app_label='store',
                model_name='ProductImage',
                object_id=instance.id,
                field_name='image',
                temp_file_path=tmp_path
            )

        return instance

    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'image_url', 'alt_text', 'position', 'is_primary', 'variant', 'upload_status']

    image_url = serializers.SerializerMethodField()
    image = serializers.ImageField(write_only=True, required=False)

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None


# ─────────────────────────────────────────────────────────────────────────────
# PRODUCT VARIANT
# ─────────────────────────────────────────────────────────────────────────────

class ProductVariantSerializer(serializers.ModelSerializer):
    attribute_values = AttributeValueSerializer(many=True, read_only=True)
    attribute_value_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=AttributeValue.objects.all(),
        write_only=True,
        source='attribute_values',
    )
    price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    is_on_sale = serializers.BooleanField(read_only=True)
    is_available = serializers.BooleanField(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = ProductVariant
        fields = [
            'id', 'sku', 'price_override', 'compare_at_price',
            'price', 'is_on_sale', 'is_available',
            'inventory', 'track_inventory',
            'attribute_values', 'attribute_value_ids',
            'weight', 'is_active', 'images',
        ]


class SimpleProductVariantSerializer(serializers.ModelSerializer):
    """Lightweight variant serializer for use in cart/order contexts."""
    attribute_values = AttributeValueSerializer(many=True, read_only=True)
    price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = ProductVariant
        fields = ['id', 'sku', 'price', 'inventory', 'attribute_values', 'is_active']


# ─────────────────────────────────────────────────────────────────────────────
# PRODUCT
# ─────────────────────────────────────────────────────────────────────────────

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    category = SimpleCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.filter(is_active=True),
        write_only=True,
        source='category',
        required=False,
        allow_null=True,
    )
    product_type = ProductTypeSerializer(read_only=True)
    product_type_id = serializers.PrimaryKeyRelatedField(
        queryset=ProductType.objects.all(),
        write_only=True,
        source='product_type',
    )
    price_with_tax = serializers.SerializerMethodField()
    review_count = serializers.IntegerField(read_only=True)
    average_rating = serializers.DecimalField(
        max_digits=3, decimal_places=2, read_only=True
    )

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'slug', 'description', 'brand',
            'product_type', 'product_type_id',
            'category', 'category_id',
            'collection',
            'base_price', 'price_with_tax',
            'is_active', 'is_featured',
            'images', 'variants',
            'review_count', 'average_rating',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']

    def get_price_with_tax(self, product: Product):
        return product.base_price * Decimal('1.1')


class SimpleProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'base_price', 'slug']


# ─────────────────────────────────────────────────────────────────────────────
# REVIEW
# ─────────────────────────────────────────────────────────────────────────────

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'name', 'title', 'description', 'rating', 'is_verified_purchase', 'date']
        read_only_fields = ['is_verified_purchase', 'date']

    def create(self, validated_data):
        product_id = self.context['product_id']
        customer = self.context.get('customer')
        return Review.objects.create(
            product_id=product_id,
            customer=customer,
            **validated_data,
        )


# ─────────────────────────────────────────────────────────────────────────────
# CART
# ─────────────────────────────────────────────────────────────────────────────

class CartItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer(read_only=True)
    variant = SimpleProductVariantSerializer(read_only=True)
    total_price = serializers.SerializerMethodField()

    def get_total_price(self, cart_item: CartItem):
        price = cart_item.variant.price if cart_item.variant else cart_item.product.base_price
        return cart_item.quantity * price

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'variant', 'quantity', 'total_price']


class CartSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()
    item_count = serializers.SerializerMethodField()

    def get_total_price(self, cart):
        return sum(
            item.quantity * (
                item.variant.price if item.variant else item.product.base_price
            )
            for item in cart.items.all()
        )

    def get_item_count(self, cart):
        return sum(item.quantity for item in cart.items.all())

    class Meta:
        model = Cart
        fields = ['id', 'items', 'item_count', 'total_price']


class AddCartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()
    variant_id = serializers.IntegerField(required=False, allow_null=True)

    def validate_product_id(self, value):
        if not Product.objects.filter(pk=value, is_active=True).exists():
            raise serializers.ValidationError('No active product with the given ID was found.')
        return value

    def validate_variant_id(self, value):
        if value is not None and not ProductVariant.objects.filter(pk=value, is_active=True).exists():
            raise serializers.ValidationError('No active variant with the given ID was found.')
        return value

    def validate(self, data):
        product_id = data.get('product_id')
        variant_id = data.get('variant_id')

        if variant_id is not None:
            if not ProductVariant.objects.filter(pk=variant_id, product_id=product_id).exists():
                raise serializers.ValidationError(
                    'The selected variant does not belong to the selected product.'
                )
        return data

    def save(self, **kwargs):
        cart_id = self.context['cart_id']
        product_id = self.validated_data['product_id']
        variant_id = self.validated_data.get('variant_id')
        quantity = self.validated_data['quantity']

        try:
            cart_item = CartItem.objects.get(
                cart_id=cart_id,
                product_id=product_id,
                variant_id=variant_id,
            )
            cart_item.quantity += quantity
            cart_item.save()
            self.instance = cart_item
        except CartItem.DoesNotExist:
            self.instance = CartItem.objects.create(
                cart_id=cart_id,
                product_id=product_id,
                variant_id=variant_id,
                quantity=quantity,
            )

        return self.instance

    class Meta:
        model = CartItem
        fields = ['id', 'product_id', 'variant_id', 'quantity']


class UpdateCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['quantity']


# ─────────────────────────────────────────────────────────────────────────────
# CUSTOMER
# ─────────────────────────────────────────────────────────────────────────────

class CustomerSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Customer
        fields = ['id', 'user_id', 'phone', 'birth_date', 'membership']


# ─────────────────────────────────────────────────────────────────────────────
# ORDER
# ─────────────────────────────────────────────────────────────────────────────

class OrderItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer(read_only=True)
    variant = SimpleProductVariantSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = [
            'id', 'product', 'variant', 'unit_price',
            'quantity', 'variant_snapshot',
        ]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            'id', 'customer', 'placed_at', 'payment_status',
            'fulfillment_status', 'items',
        ]


class UpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['payment_status', 'fulfillment_status']


class CreateOrderSerializer(serializers.Serializer):
    cart_id = serializers.UUIDField()

    def validate_cart_id(self, cart_id):
        if not Cart.objects.filter(pk=cart_id).exists():
            raise serializers.ValidationError('No cart with the given ID was found.')
        if CartItem.objects.filter(cart_id=cart_id).count() == 0:
            raise serializers.ValidationError('The cart is empty.')
        return cart_id

    def save(self, **kwargs):
        with transaction.atomic():
            cart_id = self.validated_data['cart_id']

            customer = Customer.objects.get(user_id=self.context['user_id'])
            order = Order.objects.create(customer=customer)

            cart_items = (
                CartItem.objects
                .select_related('product', 'variant')
                .prefetch_related('variant__attribute_values__attribute_type')
                .filter(cart_id=cart_id)
            )

            order_items = []
            for item in cart_items:
                variant = item.variant
                price = variant.price if variant else item.product.base_price

                # Build a snapshot of the variant attributes at purchase time
                snapshot = {}
                if variant:
                    for av in variant.attribute_values.all():
                        snapshot[av.attribute_type.name] = av.value

                order_items.append(
                    OrderItem(
                        order=order,
                        product=item.product,
                        variant=variant,
                        unit_price=price,
                        quantity=item.quantity,
                        variant_snapshot=snapshot,
                    )
                )

            OrderItem.objects.bulk_create(order_items)
            Cart.objects.filter(pk=cart_id).delete()

            order_created.send_robust(self.__class__, order=order)

            return order
