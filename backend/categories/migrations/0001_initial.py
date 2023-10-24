# Generated by Django 4.2.6 on 2023-10-24 00:31

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Category",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
                ("discount", models.DecimalField(decimal_places=2, max_digits=6)),
            ],
            options={
                "verbose_name_plural": "Categories",
            },
        ),
    ]
