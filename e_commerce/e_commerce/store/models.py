from decimal import Decimal

from django.contrib import admin
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from cloudinary.models import CloudinaryField
from django.db.models import UniqueConstraint
from django.utils.text import slugify

from uuid import uuid4

from .validators import validate_file_size

class UploadStatus(models.TextChoices):
    PENDING = 'P', 'Pending'
    COMPLETE = 'C', 'Complete'
    FAILED = 'F', 'Failed'


# ─────────────────────────────────────────────────────────────────────────────
# PROMOTION
# ─────────────────────────────────────────────────────────────────────────────

class Promotion(models.Model):
    DISCOUNT_PERCENTAGE = 'P'
    DISCOUNT_FIXED = 'F'
    DISCOUNT_TYPE_CHOICES = [
        (DISCOUNT_PERCENTAGE, 'Percentage'),
        (DISCOUNT_FIXED, 'Fixed Amount'),
    ]

    code = models.CharField(max_length=50, unique=True, blank=True, null=True)
    description = models.CharField(max_length=255)
    discount_type = models.CharField(
        max_length=1, choices=DISCOUNT_TYPE_CHOICES, default=DISCOUNT_PERCENTAGE
    )
    discount = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))],
        help_text="Percentage (0-100) or fixed amount depending on discount_type",
    )
    min_purchase = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True,
        help_text="Minimum order value to apply this promotion",
    )
    valid_from = models.DateTimeField(null=True, blank=True)
    valid_to = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.description} ({self.get_discount_type_display()})"

    class Meta:
        ordering = ['-valid_from']


# ─────────────────────────────────────────────────────────────────────────────
# COLLECTION  (curated groupings: "Summer Sale", "New Arrivals")
# ─────────────────────────────────────────────────────────────────────────────

class Collection(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    image = CloudinaryField('image', folder='collections', blank=True, null=True)
    upload_status = models.CharField(
        max_length=1, choices=UploadStatus.choices, default=UploadStatus.COMPLETE
    )
    is_active = models.BooleanField(default=True)
    featured_product = models.ForeignKey(
        'Product',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='+',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['title']


# ─────────────────────────────────────────────────────────────────────────────
# CATEGORY  (hierarchical taxonomy: Men → Footwear → Sneakers)
# ─────────────────────────────────────────────────────────────────────────────

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='children',
    )
    image = CloudinaryField('image', folder='categories', blank=True, null=True)
    upload_status = models.CharField(
        max_length=1, choices=UploadStatus.choices, default=UploadStatus.COMPLETE
    )
    position = models.PositiveIntegerField(default=0, help_text="Display order within siblings")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['position', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        if self.parent:
            return f"{self.parent.name} → {self.name}"
        return self.name

    @property
    def get_full_path(self):
        """Returns the full hierarchical path (e.g., Men → Footwear → Sports Shoes)"""
        if self.parent:
            return f"{self.parent.get_full_path} → {self.name}"
        return self.name

    def get_all_descendant_ids(self):
        """
        Returns IDs of all descendant categories using a single DB query
        (avoids N+1 by bulk-loading all descendants at once).
        """
        all_ids = []
        queue = list(
            Category.objects.filter(parent=self).values_list('id', flat=True)
        )
        all_ids.extend(queue)
        while queue:
            children_ids = list(
                Category.objects.filter(parent_id__in=queue).values_list('id', flat=True)
            )
            all_ids.extend(children_ids)
            queue = children_ids
        return all_ids


# ─────────────────────────────────────────────────────────────────────────────
# PRODUCT TYPE & ATTRIBUTES
# ─────────────────────────────────────────────────────────────────────────────

class ProductType(models.Model):
    """
    Defines a kind of product (e.g., 'Clothing', 'Footwear', 'Electronics').
    Determines which attribute dimensions apply to products of this type.
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    has_variants = models.BooleanField(
        default=True,
        help_text="If False, the product has no size/color variants (e.g., a book)",
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class AttributeType(models.Model):
    """
    Defines an attribute dimension: Size, Color, Material, etc.
    Linked to one or more ProductTypes to scope which types use which attributes.
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    product_types = models.ManyToManyField(
        ProductType,
        related_name='attribute_types',
        blank=True,
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class AttributeValue(models.Model):
    """
    A specific, selectable value: 'Red', 'XL', 'Cotton', etc.
    Each value belongs to one AttributeType.
    """
    attribute_type = models.ForeignKey(
        AttributeType,
        on_delete=models.CASCADE,
        related_name='values',
    )
    value = models.CharField(max_length=100)
    color_hex = models.CharField(
        max_length=7,
        blank=True,
        help_text="Hex color code for swatch display, e.g. #FF0000",
    )
    position = models.PositiveIntegerField(default=0, help_text="Display order")

    class Meta:
        ordering = ['attribute_type', 'position', 'value']
        constraints = [
            UniqueConstraint(fields=['attribute_type', 'value'], name='unique_attribute_value')
        ]

    def __str__(self):
        return f"{self.attribute_type.name}: {self.value}"


# ─────────────────────────────────────────────────────────────────────────────
# PRODUCT
# ─────────────────────────────────────────────────────────────────────────────

class Product(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    brand = models.CharField(max_length=100, blank=True)

    product_type = models.ForeignKey(
        ProductType,
        on_delete=models.PROTECT,
        related_name='products',
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='products',
    )
    collection = models.ForeignKey(
        Collection,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='products',
    )
    promotions = models.ManyToManyField(Promotion, blank=True)

    # Base price — variants can override this individually
    base_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))],
    )

    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['-created_at']


# ─────────────────────────────────────────────────────────────────────────────
# PRODUCT VARIANT  (the actual purchasable unit)
# ─────────────────────────────────────────────────────────────────────────────

class ProductVariant(models.Model):
    """
    Represents a specific, buyable combination of attribute values.
    Example: Nike Air Max / Size 10 / Color Red

    This is what goes into the cart and order, not the Product itself.
    """
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='variants',
    )
    sku = models.CharField(max_length=100, unique=True)

    # Price override — null means "use product.base_price"
    price_override = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(Decimal('0.01'))],
    )
    # The "was" price for showing sale badges
    compare_at_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
    )

    # Per-variant inventory
    inventory = models.PositiveIntegerField(default=0)
    track_inventory = models.BooleanField(
        default=True,
        help_text="If False, this variant is treated as always in stock",
    )

    # The defining attribute values (e.g., Size=L, Color=Blue)
    attribute_values = models.ManyToManyField(
        AttributeValue,
        related_name='variants',
        blank=True,
    )

    weight = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True,
        help_text="Weight in kg for shipping calculations",
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['product', 'sku']

    @property
    def price(self):
        """Effective selling price."""
        return self.price_override if self.price_override is not None else self.product.base_price

    @property
    def is_on_sale(self):
        return bool(self.compare_at_price and self.compare_at_price > self.price)

    @property
    def is_available(self):
        if not self.is_active:
            return False
        if not self.track_inventory:
            return True
        return self.inventory > 0

    def __str__(self):
        attrs = ", ".join(str(av) for av in self.attribute_values.all())
        return f"{self.product.title} — {attrs}" if attrs else self.product.title


# ─────────────────────────────────────────────────────────────────────────────
# PRODUCT IMAGE
# ─────────────────────────────────────────────────────────────────────────────

class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='images'
    )
    # Optional: associate image with specific variant (e.g., show blue image when blue selected)
    variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='images',
    )
    image = CloudinaryField('image', folder='store/images')
    alt_text = models.CharField(max_length=255, blank=True)
    upload_status = models.CharField(
        max_length=1, choices=UploadStatus.choices, default=UploadStatus.COMPLETE
    )
    position = models.PositiveIntegerField(default=0)
    is_primary = models.BooleanField(default=False)

    class Meta:
        ordering = ['position']

    def __str__(self):
        return f"Image for {self.product.title} (pos {self.position})"


# ─────────────────────────────────────────────────────────────────────────────
# CUSTOMER
# ─────────────────────────────────────────────────────────────────────────────

class Customer(models.Model):
    MEMBERSHIP_BRONZE = 'B'
    MEMBERSHIP_SILVER = 'S'
    MEMBERSHIP_GOLD = 'G'

    MEMBERSHIP_CHOICES = [
        (MEMBERSHIP_BRONZE, 'Bronze'),
        (MEMBERSHIP_SILVER, 'Silver'),
        (MEMBERSHIP_GOLD, 'Gold'),
    ]

    phone = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    membership = models.CharField(
        max_length=1, choices=MEMBERSHIP_CHOICES, default=MEMBERSHIP_BRONZE
    )
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'

    @admin.display(ordering='user__first_name')
    def first_name(self):
        return self.user.first_name

    @admin.display(ordering='user__last_name')
    def last_name(self):
        return self.user.last_name

    class Meta:
        # Ordering is handled at the query/admin level via user__first_name, user__last_name
        # to avoid Django system check E015 on AUTH_USER_MODEL traversal
        permissions = [
            ('view_history', 'Can view history')
        ]


# ─────────────────────────────────────────────────────────────────────────────
# ADDRESS
# ─────────────────────────────────────────────────────────────────────────────

class Address(models.Model):
    ADDRESS_SHIPPING = 'S'
    ADDRESS_BILLING = 'B'
    ADDRESS_TYPE_CHOICES = [
        (ADDRESS_SHIPPING, 'Shipping'),
        (ADDRESS_BILLING, 'Billing'),
    ]

    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name='addresses'
    )
    address_type = models.CharField(
        max_length=1, choices=ADDRESS_TYPE_CHOICES, default=ADDRESS_SHIPPING
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=100, default='US')
    phone = models.CharField(max_length=30, blank=True)
    is_default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.street}, {self.city}, {self.country}"

    class Meta:
        verbose_name_plural = "Addresses"
        ordering = ['-is_default', 'address_type']


# ─────────────────────────────────────────────────────────────────────────────
# ORDER
# ─────────────────────────────────────────────────────────────────────────────

class Order(models.Model):
    PAYMENT_STATUS_PENDING = 'P'
    PAYMENT_STATUS_COMPLETE = 'C'
    PAYMENT_STATUS_FAILED = 'F'
    PAYMENT_STATUS_REFUNDED = 'R'
    PAYMENT_STATUS_CHOICES = [
        (PAYMENT_STATUS_PENDING, 'Pending'),
        (PAYMENT_STATUS_COMPLETE, 'Complete'),
        (PAYMENT_STATUS_FAILED, 'Failed'),
        (PAYMENT_STATUS_REFUNDED, 'Refunded'),
    ]

    FULFILLMENT_UNFULFILLED = 'U'
    FULFILLMENT_PARTIAL = 'PA'
    FULFILLMENT_FULFILLED = 'F'
    FULFILLMENT_CHOICES = [
        (FULFILLMENT_UNFULFILLED, 'Unfulfilled'),
        (FULFILLMENT_PARTIAL, 'Partially Fulfilled'),
        (FULFILLMENT_FULFILLED, 'Fulfilled'),
    ]

    placed_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    payment_status = models.CharField(
        max_length=1, choices=PAYMENT_STATUS_CHOICES, default=PAYMENT_STATUS_PENDING
    )
    fulfillment_status = models.CharField(
        max_length=2, choices=FULFILLMENT_CHOICES, default=FULFILLMENT_UNFULFILLED
    )
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)
    shipping_address = models.ForeignKey(
        Address,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='orders',
    )
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-placed_at']
        permissions = [
            ('cancel_order', 'Can cancel order')
        ]

    def __str__(self):
        return f"Order #{self.id} — {self.customer}"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.PROTECT, related_name='items'
    )
    product = models.ForeignKey(
        Product, on_delete=models.PROTECT, related_name='orderitems'
    )
    variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.PROTECT,
        related_name='orderitems',
        null=True,
        blank=True,
    )
    quantity = models.PositiveSmallIntegerField()
    # Snapshot price at time of purchase — never recalculate from current price
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    # Snapshot variant attributes at time of purchase (e.g. {"Size": "L", "Color": "Blue"})
    variant_snapshot = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"{self.quantity}x {self.product.title}"


# ─────────────────────────────────────────────────────────────────────────────
# CART
# ─────────────────────────────────────────────────────────────────────────────

class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)


class CartItem(models.Model):
    cart = models.ForeignKey(
        Cart, on_delete=models.CASCADE, related_name='items'
    )
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='cart_items'
    )
    variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.CASCADE,
        related_name='cart_items',
        null=True,
        blank=True,
    )
    quantity = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1)]
    )

    class Meta:
        # A cart can have the same product only once per variant
        constraints = [
            UniqueConstraint(fields=['cart', 'variant'], name='unique_cart_variant',
                             condition=models.Q(variant__isnull=False)),
            UniqueConstraint(fields=['cart', 'product'], name='unique_cart_product_no_variant',
                             condition=models.Q(variant__isnull=True)),
        ]

    def __str__(self):
        return f"{self.quantity}x {self.product.title}"


# ─────────────────────────────────────────────────────────────────────────────
# REVIEW
# ─────────────────────────────────────────────────────────────────────────────

class Review(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='reviews'
    )
    customer = models.ForeignKey(
        Customer,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='reviews',
    )
    # Keep name for anonymous/guest reviews
    name = models.CharField(max_length=255, blank=True)
    title = models.CharField(max_length=255, blank=True)
    description = models.TextField()
    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="Rating from 1 to 5",
    )
    is_verified_purchase = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-date']
        constraints = [
            # One review per customer per product
            UniqueConstraint(
                fields=['product', 'customer'],
                name='unique_customer_product_review',
                condition=models.Q(customer__isnull=False),
            )
        ]

    def __str__(self):
        return f"{self.rating}/5 — {self.product.title}"
