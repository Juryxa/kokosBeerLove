from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import (api_view, authentication_classes,
                                       permission_classes)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication

from ...serializers import PlayerSerializer


@swagger_auto_schema(
    method="post",
    operation_description="Создание нового игрока. Доступно только администраторам (is_superuser == true).",
    request_body=PlayerSerializer,
    responses={
        201: openapi.Response(
            description="Игрок успешно создан"),
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
def create_player(request):
    # Проверка прав администратора
    if not request.user.is_superuser:
        return Response(
            {"error": "У вас нет прав для создания игроков"},
            status=status.HTTP_403_FORBIDDEN,
        )

    data = request.data.copy()

    # Преобразуем значение role в нижний регистр
    if "role" in data:
        data["role"] = data["role"].lower()

    serializer = PlayerSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
