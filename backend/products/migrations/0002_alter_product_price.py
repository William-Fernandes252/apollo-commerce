# Generated by Django 4.2.6 on 2023-10-24 00:57

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("products", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="price",
            field=models.DecimalField(
                decimal_places=2,
                max_digits=9,
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
    ]
