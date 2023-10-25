from computedfields.models import ComputedFieldsModel, computed
from django.core import validators
from django.db import models

from categories import models as categories_models


class Product(ComputedFieldsModel):
    name = models.CharField(max_length=100)
    description = models.TextField()
    color = models.CharField(max_length=100)
    price = models.DecimalField(
        max_digits=9, decimal_places=2, validators=[validators.MinValueValidator(0)]
    )
    category = models.ForeignKey(categories_models.Category, on_delete=models.CASCADE)

    @computed(
        models.DecimalField(
            help_text="Promotion price based on the product category discount",
            validators=[validators.MinValueValidator(0)],
            max_digits=9,
            decimal_places=2,
            default=0,
            null=False,
        ),
        depends=[("self", ["price"]), ("category", ["discount"])],
    )
    def promotion_price(self) -> float:
        return round(float(self.price) * float(1 - self.category.discount_for_calc), 2)

    class Meta:
        indexes = [
            models.Index(
                fields=["name", "description"],
                name="name_description_filter_index",
            ),
        ]
