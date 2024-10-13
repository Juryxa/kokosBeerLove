from rest_framework import serializers
from .models import Product, ProductSize, CartItem


class ProductSerializer(serializers.ModelSerializer):
    sizes = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'discount', 'category', 'url_images', 'sizes']

    def get_sizes(self, obj):
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

    def validate_url_images(self, value):
        return [url for url in value if url.strip() != '']

    def create(self, validated_data):
        sizes_data = validated_data.pop('sizes', [])
        product = Product.objects.create(**validated_data)

        # Сохраняем размеры с продуктом
        for size_data in sizes_data:
            size_data['size'] = size_data['size'].upper()  # Преобразуем размер в верхний регистр
            ProductSize.objects.create(product=product, **size_data)

        return product

    def update(self, instance, validated_data):
        sizes_data = validated_data.pop('sizes', None)
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.discount = validated_data.get('discount', instance.discount)
        instance.category = validated_data.get('category', instance.category)
        instance.url_images = validated_data.get('url_images', instance.url_images)
        instance.save()

        if sizes_data is not None:
            ProductSize.objects.filter(product=instance).delete()
            for size_data in sizes_data:
                size_data['size'] = size_data['size'].upper()  # Преобразуем размер в верхний регистр
                ProductSize.objects.create(product=instance, **size_data)

        return instance


class AddToCartSerializer(serializers.ModelSerializer):
    size = serializers.CharField(write_only=True)  # Передаем размер как строку

    class Meta:
        model = CartItem
        fields = ['product', 'quantity', 'size']

    def validate(self, attrs):
        # Проверяем, существует ли указанный размер для данного товара
        try:
            size = ProductSize.objects.get(size=attrs['size'].upper(), product=attrs['product'])
        except ProductSize.DoesNotExist:
            raise serializers.ValidationError("Указанный размер не существует для этого товара.")

        attrs['size_instance'] = size  # Передаем объект ProductSize в attrs для дальнейшего использования
        return attrs
