from django.db.models import QuerySet
from django_filters import rest_framework as django_filters

from products import models


class ProductFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(method="filter_by_category")
    description = django_filters.CharFilter(method="filter_by_description")

    class Meta:
        model = models.Product
        fields = {
            "name": ["icontains"],
        }

    def filter_by_category(self, queryset: QuerySet, name: str, value) -> QuerySet:
        lookup = "__".join([name, "name__icontains"])
        return queryset.filter(**{lookup: value})

    def filter_by_description(self, queryset: QuerySet, name: str, value) -> QuerySet:
        lookup = "__".join([name, "search"])
        return queryset.filter(**{lookup: value})
