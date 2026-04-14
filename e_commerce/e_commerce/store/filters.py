from django_filters.rest_framework import FilterSet, filters
from .models import Product, ProductVariant


class ProductFilter(FilterSet):
    min_price = filters.NumberFilter(field_name='base_price', lookup_expr='gte')
    max_price = filters.NumberFilter(field_name='base_price', lookup_expr='lte')
    brand = filters.CharFilter(field_name='brand', lookup_expr='icontains')
    category = filters.NumberFilter(field_name='category__id')
    category_slug = filters.CharFilter(field_name='category__slug')
    collection = filters.NumberFilter(field_name='collection__id')
    product_type = filters.NumberFilter(field_name='product_type__id')
    is_active = filters.BooleanFilter(field_name='is_active')
    is_featured = filters.BooleanFilter(field_name='is_featured')

    class Meta:
        model = Product
        fields = [
            'category', 'category_slug', 'collection',
            'product_type', 'brand',
            'min_price', 'max_price',
            'is_active', 'is_featured',
        ]


class ProductVariantFilter(FilterSet):
    min_price = filters.NumberFilter(field_name='price_override', lookup_expr='gte')
    max_price = filters.NumberFilter(field_name='price_override', lookup_expr='lte')
    in_stock = filters.BooleanFilter(method='filter_in_stock')
    attribute_value = filters.NumberFilter(field_name='attribute_values__id')

    def filter_in_stock(self, queryset, name, value):
        if value:
            return queryset.filter(inventory__gt=0, is_active=True)
        return queryset

    class Meta:
        model = ProductVariant
        fields = ['min_price', 'max_price', 'in_stock', 'attribute_value', 'is_active']