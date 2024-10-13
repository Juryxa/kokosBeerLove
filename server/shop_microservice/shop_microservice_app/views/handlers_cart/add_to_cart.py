from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import (api_view, authentication_classes,
                                       permission_classes)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication

from ...models import CartItem, Product
from ...serializers import AddToCartSerializer


@swagger_auto_schema(
    method='post',
    operation_description="Добавление товара в корзину пользователя",
    tags=['cartHandlers'],
    request_body=AddToCartSerializer,
    responses={
        201: openapi.Response(description="Товар успешно добавлен в корзину"),
        400: openapi.Response(description="Некорректные данные запроса"),
        401: openapi.Response(description="Не авторизован"),
        403: openapi.Response(description="Доступ запрещен"),
    }
)
@api_view(['POST'])
@authentication_classes([JWTTokenUserAuthentication])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    # Получаем ID пользователя из токена
    user_id = request.user.id

    # Получаем данные из запроса
    serializer = AddToCartSerializer(data=request.data)

    if serializer.is_valid():
        product_id = serializer.validated_data['product'].id
        quantity = serializer.validated_data['quantity']

        # Проверяем наличие товара в корзине
        cart_item, created = CartItem.objects.get_or_create(user_id=user_id, product_id=product_id)

        if not created:
            # Если товар уже есть, обновляем количество
            cart_item.quantity += quantity
        else:
            # Если товар новый, просто сохраняем
            cart_item.quantity = quantity

        cart_item.save()

        return Response({"message": "Товар успешно добавлен в корзину"}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
