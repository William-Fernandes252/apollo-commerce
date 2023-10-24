from django.conf import settings
from rest_framework import routers

from categories import views

router = (routers.SimpleRouter if settings.DEBUG else routers.DefaultRouter)()

router.register(r"categories", views.CategoryViewSet)

urlpatterns = router.urls
