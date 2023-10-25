# Generated by Django 4.2.6 on 2023-10-25 14:38

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("categories", "0003_auto_20231025_1336"),
    ]

    operations = [
        migrations.AlterField(
            model_name="category",
            name="discount",
            field=models.DecimalField(
                db_comment="Discount in percent",
                decimal_places=2,
                help_text="Discount in percent",
                max_digits=5,
                validators=[
                    django.core.validators.MinValueValidator(0),
                    django.core.validators.MaxValueValidator(100),
                ],
            ),
        ),
    ]
