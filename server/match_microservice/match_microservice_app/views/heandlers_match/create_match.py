from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated
from ...serializers import MatchCreateSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


@swagger_auto_schema(
    method='post',
    operation_description="Создание нового матча с указанием названия и логотипа гостевой команды в формате JSON (name и logo_url). ВАЖНО ПЕРЕДАТЬ access token, если в payload будет is_superuser == true (то пользователь-администратор).",
    request_body=MatchCreateSerializer,
    responses={
        201: openapi.Response(description="Матч успешно создан"),
        400: openapi.Response(description="Неправильные данные"),
        401: openapi.Response(description="Неавторизован"),
        403: openapi.Response(description="Нет прав доступа"),
    }
)

@api_view(['POST'])
@authentication_classes([JWTTokenUserAuthentication])
@permission_classes([IsAuthenticated])
def create_match(request):
    # Проверка прав администратора
    if not request.user.is_superuser:
        return Response({'error': 'У вас нет прав для создания матчей'}, status=status.HTTP_403_FORBIDDEN)

    serializer = MatchCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
