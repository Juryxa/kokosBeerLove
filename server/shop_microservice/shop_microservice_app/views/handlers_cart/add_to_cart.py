from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated
from ...serializers import AddToCartSerializer
from ...models import CartItem, Product


@swagger_auto_schema(
    method='post',
    operation_description="Добавление товара с размером в корзину пользователя",
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
    user_id = request.user.id
    serializer = AddToCartSerializer(data=request.data)

    if serializer.is_valid():
        product = serializer.validated_data['product']
        quantity = serializer.validated_data['quantity']
        size = serializer.validated_data['size_instance']

        # Проверяем наличие товара с указанным размером в корзине
        cart_item, created = CartItem.objects.get_or_create(user_id=user_id, product=product, size=size)

        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity

        cart_item.save()

        return Response({"message": f"Товар ({size.size}) успешно добавлен в корзину"}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
