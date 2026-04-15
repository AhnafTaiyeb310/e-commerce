from django.contrib import admin, messages
from django.db.models import Count, Avg
from django.db.models.query import QuerySet
from django.utils.html import format_html, urlencode
from django.urls import reverse

from . import models


# ─────────────────────────────────────────────────────────────────────────────
# FILTERS
# ─────────────────────────────────────────────────────────────────────────────

class InventoryFilter(admin.SimpleListFilter):
    title = 'inventory'
    parameter_name = 'inventory'

    def lookups(self, request, model_admin):
        return [
            ('<10', 'Low (< 10)'),
            ('0', 'Out of Stock'),
        ]

    def queryset(self, request, queryset: QuerySet):
        if self.value() == '<10':
            return queryset.filter(inventory__lt=10)
        if self.value() == '0':
            return queryset.filter(inventory=0)


# ─────────────────────────────────────────────────────────────────────────────
# CATEGORY
# ─────────────────────────────────────────────────────────────────────────────

@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'parent', 'position', 'is_active', 'product_count']
    list_editable = ['position', 'is_active']
    list_filter = ['is_active', 'parent']
    list_per_page = 25
    list_select_related = ['parent']
    search_fields = ['name']
    prepopulated_fields = {'slug': ['name']}

    def product_count(self, category):
        url = (
            reverse('admin:store_product_changelist')
            + '?'
            + urlencode({'category__id': str(category.id)})
        )
        count = category.products.count()
        return format_html('<a href="{}">{} Products</a>', url, count)

    product_count.short_description = 'Products'


# ─────────────────────────────────────────────────────────────────────────────
# COLLECTION
# ─────────────────────────────────────────────────────────────────────────────

@admin.register(models.Collection)
class CollectionAdmin(admin.ModelAdmin):
    autocomplete_fields = ['featured_product']
    list_display = ['title', 'is_active', 'products_count']
    list_editable = ['is_active']
    list_per_page = 25
    prepopulated_fields = {'slug': ['title']}
    search_fields = ['title']

    @admin.display(ordering='products_count')
    def products_count(self, collection):
        url = (
            reverse('admin:store_product_changelist')
            + '?'
            + urlencode({'collection__id': str(collection.id)})
        )
        return format_html('<a href="{}">{} Products</a>', url, collection.products_count)

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(products_count=Count('products'))


# ─────────────────────────────────────────────────────────────────────────────
# PRODUCT TYPE & ATTRIBUTES
# ─────────────────────────────────────────────────────────────────────────────

class AttributeTypeInline(admin.TabularInline):
    model = models.AttributeType.product_types.through
    verbose_name = "Attribute Type"
    verbose_name_plural = "Attribute Types"
    extra = 1


@admin.register(models.ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'has_variants', 'attribute_count']
    list_editable = ['has_variants']
    prepopulated_fields = {'slug': ['name']}
    search_fields = ['name']

    def attribute_count(self, obj):
        return obj.attribute_types.count()

    attribute_count.short_description = '# Attributes'

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('attribute_types')


class AttributeValueInline(admin.TabularInline):
    model = models.AttributeValue
    extra = 3
    fields = ['value', 'color_hex', 'position']


@admin.register(models.AttributeType)
class AttributeTypeAdmin(admin.ModelAdmin):
    inlines = [AttributeValueInline]
    list_display = ['name', 'slug', 'value_count']
    list_filter = ['product_types']
    prepopulated_fields = {'slug': ['name']}
    search_fields = ['name']

    def value_count(self, obj):
        return obj.values.count()

    value_count.short_description = '# Values'

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(value_count=Count('values'))


@admin.register(models.AttributeValue)
class AttributeValueAdmin(admin.ModelAdmin):
    list_display = ['attribute_type', 'value', 'color_swatch', 'position']
    list_editable = ['position']
    list_filter = ['attribute_type']
    list_per_page = 50
    list_select_related = ['attribute_type']
    search_fields = ['value', 'attribute_type__name']

    def color_swatch(self, obj):
        if obj.color_hex:
            return format_html(
                '<span style="display:inline-block;width:20px;height:20px;'
                'background:{};border:1px solid #ccc;border-radius:3px;"></span>',
                obj.color_hex,
            )
        return '-'

    color_swatch.short_description = 'Color'


# ─────────────────────────────────────────────────────────────────────────────
# PRODUCT
# ─────────────────────────────────────────────────────────────────────────────

class ProductImageInline(admin.TabularInline):
    model = models.ProductImage
    readonly_fields = ['thumbnail']
    extra = 1
    fields = ['image', 'thumbnail', 'alt_text', 'position', 'is_primary', 'variant']

    def thumbnail(self, instance):
        if instance.image and instance.image.name:
            return format_html('<img src="{}" style="height:60px;border-radius:4px;" />', instance.image.url)
        return '—'


class ProductVariantInline(admin.TabularInline):
    model = models.ProductVariant
    extra = 0
    fields = [
        'sku', 'price_override', 'compare_at_price',
        'inventory', 'track_inventory', 'weight', 'is_active',
    ]
    show_change_link = True


@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    autocomplete_fields = ['collection', 'category', 'product_type']
    prepopulated_fields = {'slug': ['title']}
    actions = ['clear_inventory', 'activate_products', 'deactivate_products']
    inlines = [ProductVariantInline, ProductImageInline]
    list_display = ['title', 'brand', 'category', 'base_price', 'is_active', 'is_featured', 'inventory_status', 'review_avg']
    list_editable = ['base_price', 'is_active', 'is_featured']
    list_filter = ['category', 'product_type', 'is_active', 'is_featured', 'collection']
    list_per_page = 10
    list_select_related = ['category', 'product_type', 'collection']
    search_fields = ['title', 'brand', 'slug']
    filter_horizontal = ['promotions']

    @admin.display(description='Inventory')
    def inventory_status(self, product):
        total = sum(v.inventory for v in product.variants.all())
        if total == 0:
            return format_html('<span style="color:red;font-weight:bold;">{}</span>', "Out of Stock")
        if total < 10:
            return format_html('<span style="color:orange;font-weight:bold;">Low ({})</span>', total)
        return format_html('<span style="color:green;">{}</span>', total)

    @admin.display(description='Avg Rating')
    def review_avg(self, product):
        avg = product.reviews.aggregate(a=Avg('rating'))['a']
        return f"{avg:.1f} ★" if avg else '—'

    @admin.action(description='Clear inventory for selected products')
    def clear_inventory(self, request, queryset):
        variant_ids = models.ProductVariant.objects.filter(product__in=queryset).values_list('id', flat=True)
        updated = models.ProductVariant.objects.filter(id__in=variant_ids).update(inventory=0)
        self.message_user(
            request,
            f'{updated} variant(s) inventory cleared.',
            messages.SUCCESS,  # ← was messages.ERROR — fixed!
        )

    @admin.action(description='Activate selected products')
    def activate_products(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f'{updated} product(s) activated.', messages.SUCCESS)

    @admin.action(description='Deactivate selected products')
    def deactivate_products(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f'{updated} product(s) deactivated.', messages.SUCCESS)

    class Media:
        css = {'all': ['store/styles.css']}


@admin.register(models.ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ['sku', 'product', 'price', 'inventory', 'is_available_display', 'is_active']
    list_editable = ['is_active']
    list_filter = [InventoryFilter, 'is_active', 'product__category']
    list_per_page = 25
    list_select_related = ['product']
    search_fields = ['sku', 'product__title']
    filter_horizontal = ['attribute_values']

    @admin.display(description='Price', ordering='price_override')
    def price(self, obj):
        return f'${obj.price:.2f}'

    @admin.display(boolean=True, description='Available')
    def is_available_display(self, obj):
        return obj.is_available


# ─────────────────────────────────────────────────────────────────────────────
# CUSTOMER
# ─────────────────────────────────────────────────────────────────────────────

@admin.register(models.Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'membership', 'orders']
    list_editable = ['membership']
    list_per_page = 10
    list_select_related = ['user']
    ordering = ['user__first_name', 'user__last_name']
    search_fields = ['user__first_name__istartswith', 'user__last_name__istartswith']

    @admin.display(ordering='orders_count')
    def orders(self, customer):
        url = (
            reverse('admin:store_order_changelist')
            + '?'
            + urlencode({'customer__id': str(customer.id)})
        )
        return format_html('<a href="{}">{} Orders</a>', url, customer.orders_count)

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(orders_count=Count('order'))


# ─────────────────────────────────────────────────────────────────────────────
# ORDER
# ─────────────────────────────────────────────────────────────────────────────

class OrderItemInline(admin.TabularInline):
    autocomplete_fields = ['product']
    min_num = 1
    max_num = 50
    model = models.OrderItem
    extra = 0
    readonly_fields = ['variant_snapshot']
    fields = ['product', 'variant', 'quantity', 'unit_price', 'variant_snapshot']


@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    autocomplete_fields = ['customer']
    inlines = [OrderItemInline]
    list_display = ['id', 'placed_at', 'customer', 'payment_status', 'fulfillment_status']
    list_filter = ['payment_status', 'fulfillment_status', 'placed_at']
    list_per_page = 20
    list_select_related = ['customer__user']
    search_fields = ['id', 'customer__user__first_name', 'customer__user__last_name']
    readonly_fields = ['placed_at']


# ─────────────────────────────────────────────────────────────────────────────
# PROMOTION
# ─────────────────────────────────────────────────────────────────────────────

@admin.register(models.Promotion)
class PromotionAdmin(admin.ModelAdmin):
    list_display = ['description', 'code', 'discount_type', 'discount', 'is_active', 'valid_from', 'valid_to']
    list_editable = ['is_active']
    list_filter = ['discount_type', 'is_active']
    search_fields = ['description', 'code']


# ─────────────────────────────────────────────────────────────────────────────
# REVIEW
# ─────────────────────────────────────────────────────────────────────────────

@admin.register(models.Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['product', 'rating', 'name', 'title', 'is_verified_purchase', 'date']
    list_filter = ['rating', 'is_verified_purchase', 'date']
    list_per_page = 25
    list_select_related = ['product', 'customer']
    search_fields = ['product__title', 'name', 'title']
    readonly_fields = ['date', 'is_verified_purchase']


# ─────────────────────────────────────────────────────────────────────────────
# ADDRESS
# ─────────────────────────────────────────────────────────────────────────────

@admin.register(models.Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['customer', 'address_type', 'street', 'city', 'country', 'is_default']
    list_filter = ['address_type', 'is_default', 'country']
    list_select_related = ['customer__user']
    search_fields = ['customer__user__first_name', 'street', 'city']
