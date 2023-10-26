from rest_framework import viewsets

from products import filters, models, serializers


class ProductViewSet(viewsets.ModelViewSet):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer
    filterset_class = filters.ProductFilter
