from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ...serializers import MatchSerializer
from drf_yasg.utils import swagger_auto_schema
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes
from drf_yasg import openapi

@swagger_auto_schema(
    method='post',
    operation_description="Создание нового матча. ВАЖНО ПЕРЕДАТЬ access token. Пользователь должен быть администратором (is_superuser == true), иначе ответит 403.",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['team_home', 'team_away', 'score_home', 'score_away', 'location', 'division'],
        properties={
            'team_home': openapi.Schema(type=openapi.TYPE_STRING, description='Название домашней команды'),
            'team_away': openapi.Schema(type=openapi.TYPE_STRING, description='Название гостевой команды'),
            'score_home': openapi.Schema(type=openapi.TYPE_INTEGER, description='Счет домашней команды'),
            'score_away': openapi.Schema(type=openapi.TYPE_INTEGER, description='Счет гостевой команды'),
            'location': openapi.Schema(type=openapi.TYPE_STRING, description='Место проведения матча'),
            'division': openapi.Schema(type=openapi.TYPE_STRING, description='Дивизион'),
            'video_url': openapi.Schema(type=openapi.TYPE_STRING, description='URL видео матча'),
        },
    ),
    responses={
        201: openapi.Response(description="Матч успешно создан"),
        400: openapi.Response(description="Неверные данные"),
        401: openapi.Response(description="Неавторизован. Необходимо передать токен доступа."),
        403: openapi.Response(description="У вас нет прав доступа для создания матча (нужен is_superuser)."),
    }
)
@api_view(['POST'])
@authentication_classes([JWTTokenUserAuthentication])
@permission_classes([IsAuthenticated])
def create_match(request):
    # Проверка наличия is_superuser в токене
    if not request.user.is_superuser:
        return Response({'error': 'У вас нет прав доступа для создания матчей'}, status=status.HTTP_403_FORBIDDEN)

    # Проверка на наличие всех обязательных полей
    team_home = request.data.get('team_home')
    team_away = request.data.get('team_away')
    score_home = request.data.get('score_home')
    score_away = request.data.get('score_away')
    location = request.data.get('location')
    division = request.data.get('division')

    if team_home and team_away and score_home is not None and score_away is not None and location and division:
        # Если все обязательные поля присутствуют, сохраняем матч
        serializer = MatchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Если отсутствуют обязательные поля, возвращаем ошибку
    return Response({'error': 'Отсутствуют обязательные поля'}, status=status.HTTP_400_BAD_REQUEST)