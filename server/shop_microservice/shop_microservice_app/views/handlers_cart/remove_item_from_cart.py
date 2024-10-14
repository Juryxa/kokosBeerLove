from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated
from ...models import CartItem

@swagger_auto_schema(
    method='delete',
    operation_description="Удаление товара из корзины по ID",
    tags=['cartHandlers'],
    manual_parameters=[
        openapi.Parameter('product_id', openapi.IN_PATH, description="ID товара", type=openapi.TYPE_INTEGER),
        openapi.Parameter('size', openapi.IN_QUERY, description="Размер товара", type=openapi.TYPE_STRING)
    ],
    responses={
        204: openapi.Response(description="Товар успешно удален из корзины"),
        400: openapi.Response(description="Некорректные данные запроса"),
        404: openapi.Response(description="Товар не найден в корзине"),
        401: openapi.Response(description="Не авторизован"),
        403: openapi.Response(description="Доступ запрещен"),
    }
)
@api_view(['DELETE'])
@authentication_classes([JWTTokenUserAuthentication])
@permission_classes([IsAuthenticated])
def remove_item_from_cart(request, product_id):
    user_id = request.user.id
    size = request.query_params.get('size', '').upper()  # Получаем размер товара из запроса

    if not size:
        return Response({"error": "Размер товара должен быть указан"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Пытаемся найти товар в корзине по user_id, product_id и размеру
        cart_item = CartItem.objects.get(user_id=user_id, product_id=product_id, size__size=size)

        # Если количество товара больше 1, уменьшаем количество
        if cart_item.quantity > 1:
            cart_item.quantity -= 1
            cart_item.save()
        else:
            # Если количество товара 1, удаляем запись
            cart_item.delete()

        return Response({"message": "Товар успешно удален из корзины"}, status=status.HTTP_204_NO_CONTENT)

    except CartItem.DoesNotExist:
        return Response({"error": "Товар не найден в корзине"}, status=status.HTTP_404_NOT_FOUND)
