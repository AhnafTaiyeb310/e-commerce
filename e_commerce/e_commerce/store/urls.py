from django.urls import path, include
from rest_framework_nested import routers

from . import views


# ─── Root router ─────────────────────────────────────────────────────────────
router = routers.DefaultRouter()
router.register('products', views.ProductViewSet, basename='products')
router.register('collections', views.CollectionViewSet, basename='collections')
router.register('carts', views.CartViewSet, basename='carts')
router.register('customers', views.CustomerViewSet, basename='customers')
router.register('orders', views.OrderViewSet, basename='orders')
router.register('categories', views.CategoryViewSet, basename='categories')
router.register('product-types', views.ProductTypeViewSet, basename='product-types')
router.register('attribute-types', views.AttributeTypeViewSet, basename='attribute-types')

# ─── Products nested router ───────────────────────────────────────────────────
products_router = routers.NestedDefaultRouter(router, 'products', lookup='product')
products_router.register('reviews', views.ReviewViewSet, basename='product-reviews')
products_router.register('images', views.ProductImageViewSet, basename='product-images')
products_router.register('variants', views.ProductVariantViewSet, basename='product-variants')

# ─── Attribute types nested router ───────────────────────────────────────────
attribute_types_router = routers.NestedDefaultRouter(router, 'attribute-types', lookup='attribute_type')
attribute_types_router.register('values', views.AttributeValueViewSet, basename='attribute-values')

# ─── Carts nested router ─────────────────────────────────────────────────────
carts_router = routers.NestedDefaultRouter(router, 'carts', lookup='cart')
carts_router.register('items', views.CartItemViewSet, basename='cart-items')

# ─── URL Patterns ─────────────────────────────────────────────────────────────
urlpatterns = [
    path('', include(router.urls)),
    path('', include(products_router.urls)),
    path('', include(attribute_types_router.urls)),
    path('', include(carts_router.urls)),
    # Category-browsing convenience endpoint
    path(
        'browse/<slug:category_slug>/',
        views.CategoryProductListView.as_view(),
        name='category-product-list',
    ),
]