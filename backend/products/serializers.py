from rest_framework import serializers

from products import models


class ProductSerializer(serializers.ModelSerializer):
    promotion_price = serializers.DecimalField(
        read_only=True, max_digits=9, decimal_places=2
    )

    class Meta:
        model = models.Product
        fields = "__all__"
