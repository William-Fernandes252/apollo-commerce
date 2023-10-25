from factory import Iterator, SubFactory
from factory.django import DjangoModelFactory

from apollo_commerce_api.tests.utils import fake
from categories import models as categories_models
from products import models


class ProductFactory(DjangoModelFactory):
    name = fake.ecommerce_name()
    description = fake.text()
    color = fake.color_name()
    price = fake.pyfloat(min_value=0, max_value=100, right_digits=2)
    category = Iterator(categories_models.Category.objects.all())

    class Meta:
        model = models.Product
