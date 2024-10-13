from rest_framework import serializers

from .models import CartItem, Product, ProductSize



class ProductSerializer(serializers.ModelSerializer):
    sizes = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'discount', 'category', 'url_images', 'sizes']

    def get_sizes(self, obj):
        # Получаем размеры и количество для каждого размера
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

        # Save the sizes with the related product
        for size_data in sizes_data:
            size_data['size'] = size_data['size'].upper()  # Convert size to uppercase
            ProductSize.objects.create(product=product, **size_data)

        return product

    def update(self, instance, validated_data):
        # Update the product fields
        sizes_data = validated_data.pop('sizes', None)
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.discount = validated_data.get('discount', instance.discount)
        instance.category = validated_data.get('category', instance.category)
        instance.url_images = validated_data.get('url_images', instance.url_images)
        instance.save()

        # Handle sizes update if provided
        if sizes_data is not None:
            # Clear the existing sizes
            ProductSize.objects.filter(product=instance).delete()

            # Create new sizes
            for size_data in sizes_data:
                size_data['size'] = size_data['size'].upper()  # Convert size to uppercase
                ProductSize.objects.create(product=instance, **size_data)

        return instance

class AddToCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['product', 'quantity']
