from django.db import models

from categories import models as categories_models


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    color = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=9, decimal_places=2)
    category = models.ForeignKey(categories_models.Category, on_delete=models.CASCADE)

    @property
    def promotion_price(self) -> float:
        return self.price * (1 - self.category.discount)

    class Meta:
        indexes = [
            models.Index(
                fields=["name", "description"],
                name="name_description_filter_index",
            ),
        ]
