from django.conf import settings
from django.urls import path, include
from rest_framework.routers import DefaultRouter, SimpleRouter

from e_commerce.users.api.views import UserViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)

app_name = "api"
urlpatterns = router.urls + [
    path('store/', include('e_commerce.store.urls')),
]
