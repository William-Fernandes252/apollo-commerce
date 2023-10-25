from django.core import validators
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    discount = models.DecimalField(
        help_text="Discount in percent",
        max_digits=5,
        decimal_places=2,
        validators=[validators.MinValueValidator(0), validators.MaxValueValidator(100)],
        db_comment="Discount in percent",
    )

    @property
    def discount_for_calc(self) -> float:
        """Returns the discout value for calculations."""
        return self.discount / 100

    class Meta:
        verbose_name_plural = "Categories"
