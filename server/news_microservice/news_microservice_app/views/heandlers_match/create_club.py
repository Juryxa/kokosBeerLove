from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ...serializers import TeamSerializer
from drf_yasg.utils import swagger_auto_schema
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes
from drf_yasg import openapi


@swagger_auto_schema(
    method='post',
    operation_description="Создание новой команды. ВАЖНО ПЕРЕДАТЬ access token. Пользователь должен быть администратором (is_superuser == true), иначе ответит 403.",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['name', 'logo_url'],
        properties={
            'name': openapi.Schema(type=openapi.TYPE_STRING, description='Название команды'),
            'logo_url': openapi.Schema(type=openapi.TYPE_STRING, description='URL логотипа команды')
        },
    ),
    responses={
        201: openapi.Response(description="Команда успешно создана"),
        400: openapi.Response(description="Неверные данные"),
        401: openapi.Response(description="Неавторизован. Необходимо передать токен доступа."),
        403: openapi.Response(description="У вас нет прав доступа для создания команды (нужен is_superuser)."),
    }
)
@api_view(['POST'])
@authentication_classes([JWTTokenUserAuthentication])
@permission_classes([IsAuthenticated])
def create_team(request):
    # Проверка наличия is_superuser в токене
    if not request.user.is_superuser:
        return Response({'error': 'У вас нет прав доступа для создания команд'}, status=status.HTTP_403_FORBIDDEN)

    # Проверка на наличие всех обязательных полей
    name = request.data.get('name')
    logo_url = request.data.get('logo_url')

    if name and logo_url:
        # Сохранение команды в базе данных с указанными полями
        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Если отсутствуют обязательные поля, возвращаем ошибку
    return Response({'error': 'Отсутствуют обязательные поля: name или logo_url'}, status=status.HTTP_400_BAD_REQUEST)

