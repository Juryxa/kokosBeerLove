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
    method='post',
    operation_description="Создание нового товара с указанием размеров и их количества",
    tags=['productHandlers'],
    request_body=ProductCreateSerializer,
    responses={
        201: openapi.Response(description="Товар успешно создан"),
        400: openapi.Response(description="Неправильные данные"),
        401: openapi.Response(description="Неавторизован"),
        403: openapi.Response(description="Нет прав доступа"),
    }
)
@api_view(['POST'])
@authentication_classes([JWTTokenUserAuthentication])
@permission_classes([IsAuthenticated])
def create_product(request):
    if not request.user.is_superuser:
        return Response({'error': 'У вас нет прав доступа для создания товаров'}, status=status.HTTP_403_FORBIDDEN)

    serializer = ProductCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
