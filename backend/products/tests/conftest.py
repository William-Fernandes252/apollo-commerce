import pytest

from products.tests.factories import ProductFactory


@pytest.fixture
def product(db):
    return ProductFactory()
