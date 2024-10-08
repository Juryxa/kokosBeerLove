from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'url_images', 'created_at']

class ProductCreateSerializer(serializers.ModelSerializer):
    url_images = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=False
    )

    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'url_images']