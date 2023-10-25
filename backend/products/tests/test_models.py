from decimal import Decimal

import pytest
from django.core.exceptions import ValidationError

from apollo_commerce_api.tests.utils import fake
from products import models
from products.tests import factories


class TestProduct:
    class TestPromotionPrice:
        @pytest.mark.parametrize(
            "percentage", [fake.pyfloat(min_value=1, max_value=100) for _ in range(4)]
        )
        def test_it_computes_price_from_category_discount(
            self, percentage: float, product: models.Product
        ):
            product.category.discount = percentage
            product.category.save()
            product.refresh_from_db()
            assert product.promotion_price < product.price
