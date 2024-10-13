from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import (api_view, authentication_classes,
                                       permission_classes)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication

from ...serializers import ProductCreateSerializer


@swagger_auto_schema(
    method="post",
    operation_description=(
        "Создание нового товара с указанием массива URL изображений. ВАЖНО ПЕРЕДАТЬ access token, если в payload "
        "будет is_superuser == true(то пользователь-администратор), иначе ответит 401 или 403"),
    request_body=ProductCreateSerializer,
    responses={
        201: openapi.Response(
            description="Товар успешно создан"),
        400: openapi.Response(
            description="Неправильные данные"),
        401: openapi.Response(
            description="Неавторизован"),
        403: openapi.Response(
            description="Нет прав доступа"),
    },
)
@api_view(["POST"])
@authentication_classes([JWTTokenUserAuthentication])
@permission_classes([IsAuthenticated])
def create_product(request):
    # Проверка наличия is_superuser в токене
    if not request.user.is_superuser:
        return Response(
            {"error": "У вас нет прав доступа для создания товаров"},
            status=status.HTTP_403_FORBIDDEN,
        )

    # Получаем данные с удалением пустых строк в массиве url_images
    data = request.data
    if "url_images" in data:
        # Удаляем пустые строки из массива изображений
        data["url_images"] = [url for url in data["url_images"] if url]

    # Сериализуем данные
    serializer = ProductCreateSerializer(data=data)
    if serializer.is_valid():
        # Сохраняем данные и массив изображений
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
