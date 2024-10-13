from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated
from ...serializers import ProductSerializer, CartItem
from ...models import CartItem

@swagger_auto_schema(
    method='get',
    operation_description="Получение всех товаров из корзины пользователя",
    tags=['cartHandlers'],
    responses={
        200: openapi.Response(description="Товары успешно получены", schema=ProductSerializer(many=True)),
        401: openapi.Response(description="Не авторизован"),
        403: openapi.Response(description="Доступ запрещен"),
    }
)
@api_view(['GET'])
@authentication_classes([JWTTokenUserAuthentication])
@permission_classes([IsAuthenticated])
def get_all_items_from_cart(request):
    # Получаем ID пользователя из токена
    user_id = request.user.id

    # Получаем все товары, добавленные в корзину пользователем
    cart_items = CartItem.objects.filter(user_id=user_id)

    # Сериализуем данные для ответа
    products = [item.product for item in cart_items]
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)