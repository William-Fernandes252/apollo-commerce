from rest_framework import serializers

from categories import models as categories_models
from products import models


class ProductSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    url = serializers.HyperlinkedIdentityField(view_name="product-detail")
    promotion_price = serializers.DecimalField(
        read_only=True, max_digits=9, decimal_places=2
    )
    category = serializers.SlugRelatedField(
        queryset=categories_models.Category.objects.all(),
        slug_field="name",
    )

    class Meta:
        model = models.Product
        fields = "__all__"
