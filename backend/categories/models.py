from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    discount = models.DecimalField(max_digits=6, decimal_places=2)

    class Meta:
        verbose_name_plural = "Categories"
