from django.db import models
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField
    url_images = ArrayField(
        models.CharField(max_length=500), blank=True, default=list
    )  # Поле для массива URL изображений

    class Meta:
        db_table = 'shop_products'

    def __str__(self):
        return self.name