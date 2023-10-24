from django.conf import settings
from rest_framework import routers

from products import views

router = (routers.SimpleRouter if settings.DEBUG else routers.DefaultRouter)()

router.register(r"products", views.ProductViewSet)

urlpatterns = router.urls
