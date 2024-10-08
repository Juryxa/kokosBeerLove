from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes

from ...models import Product
from ...serializers import ProductCreateSerializer, ProductSerializer

@swagger_auto_schema(
    methods=['put', 'patch'],
    operation_description="Обновление существующего товара с указанием URL изображений. ВАЖНО ПЕРЕДАТЬ access token, если в payload будет is_superuser == true(то пользователь-администратор), иначе ответит 401 или 403",
    manual_parameters=[
        openapi.Parameter('product_id', openapi.IN_PATH, description="ID товара", type=openapi.TYPE_INTEGER)
    ],
    request_body=ProductCreateSerializer,
    responses={
        200: openapi.Response(description="Товар успешно обновлен"),
        404: openapi.Response(description="Товар не найден"),
        400: openapi.Response(description="Неправильные данные"),
        401: openapi.Response(description="Неавторизован"),
        403: openapi.Response(description="Нет прав доступа"),
    }
)
@api_view(['PUT', 'PATCH'])
@authentication_classes([JWTTokenUserAuthentication])
@permission_classes([IsAuthenticated])
def update_product(request, product_id):
    # Проверка наличия is_superuser в токене
    if not request.user.is_superuser:
        return Response({'error': 'У вас нет прав доступа для обновления товаров'}, status=status.HTTP_403_FORBIDDEN)

    try:
        # Ищем товар по id
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Товар не найден'}, status=status.HTTP_404_NOT_FOUND)

    # Получаем данные для обновления
    serializer = ProductCreateSerializer(product, data=request.data, partial=True)

    if serializer.is_valid():
        # Обновляем поля товара
        serializer.save()

        # Обновляем URL изображений, если они были переданы
        image_urls = request.data.get('image_urls', [])
        if image_urls:
            product.url_images = image_urls
            product.save()

        return Response(status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
