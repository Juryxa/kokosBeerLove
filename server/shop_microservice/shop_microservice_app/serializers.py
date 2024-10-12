from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    # Сериализатор для отображения продукта
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'url_images']



class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'url_images', 'material', 'color', 'size']


class ProductCreateSerializer(serializers.ModelSerializer):
    url_images = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=False
    )

    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'url_images']

    def create(self, validated_data):
        # Извлекаем данные из validated_data
        url_images = validated_data.pop('url_images', [])

        # Создаем продукт
        product = Product.objects.create(**validated_data)

        # Если есть изображения, добавляем их в продукт
        product.url_images = url_images
        product.save()

        return product
