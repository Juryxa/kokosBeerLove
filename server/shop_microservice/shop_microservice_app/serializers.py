from rest_framework import serializers
from .models import Product, ProductSize, CartItem

class ProductSerializer(serializers.ModelSerializer):
    # Сериализатор для отображения продукта
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'url_images']

class ProductDetailSerializer(serializers.ModelSerializer):
    sizes = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'url_images', 'sizes']

    def get_sizes(self, obj):
        # Возвращаем размеры и количество товара для каждого размера
        sizes = ProductSize.objects.filter(product=obj)
        return ProductSizeSerializer(sizes, many=True).data

class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = ['size', 'quantity']

class ProductCreateSerializer(serializers.ModelSerializer):
    sizes = ProductSizeSerializer(many=True)

    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'discount', 'category', 'url_images', 'sizes']

    def create(self, validated_data):
        sizes_data = validated_data.pop('sizes', [])
        product = Product.objects.create(**validated_data)

        # Преобразуем размер в верхний регистр перед сохранением
        for size_data in sizes_data:
            size_data['size'] = size_data['size'].upper()  # Преобразование регистра
            ProductSize.objects.create(product=product, **size_data)

        return product

class AddToCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['product', 'quantity']
