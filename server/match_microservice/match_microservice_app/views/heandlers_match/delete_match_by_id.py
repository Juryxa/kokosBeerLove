from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import (api_view, authentication_classes,
                                       permission_classes)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication

from ...models import Match


@swagger_auto_schema(
    method="delete",
    operation_description="Удаление матча по его ID. Доступно только администраторам (is_superuser == true).",
    responses={
        204: openapi.Response(
            description="Матч успешно удален"),
        404: openapi.Response(
            description="Матч не найден"),
        403: openapi.Response(
            description="Нет прав доступа"),
    },
)
@api_view(["DELETE"])
@authentication_classes([JWTTokenUserAuthentication])
@permission_classes([IsAuthenticated])
def delete_match_by_id(request, match_id):
    # Проверка прав администратора
    if not request.user.is_superuser:
        return Response(
            {"error": "У вас нет прав для удаления матчей"},
            status=status.HTTP_403_FORBIDDEN,
        )

    try:
        # Ищем матч по id
        match = Match.objects.get(id=match_id)
        match.delete()  # Удаляем матч
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Match.DoesNotExist:
        return Response({"error": "Матч не найден"},
                        status=status.HTTP_404_NOT_FOUND)
