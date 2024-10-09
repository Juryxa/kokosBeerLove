from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated
from ...serializers import MatchSerializer
from ...models import Team
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@swagger_auto_schema(
    method='post',
    operation_description="Создание нового матча с указанием даты, времени и URL изображения.",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['team_home', 'team_away', 'score_home', 'score_away', 'location', 'division', 'match_date', 'match_time'],
        properties={
            'team_home': openapi.Schema(type=openapi.TYPE_STRING, description='Название домашней команды'),
            'team_away': openapi.Schema(type=openapi.TYPE_INTEGER, description='ID гостевой команды'),
            'score_home': openapi.Schema(type=openapi.TYPE_INTEGER, description='Счет домашней команды'),
            'score_away': openapi.Schema(type=openapi.TYPE_INTEGER, description='Счет гостевой команды'),
            'location': openapi.Schema(type=openapi.TYPE_STRING, description='Место проведения матча'),
            'division': openapi.Schema(type=openapi.TYPE_STRING, description='Дивизион'),
            'video_url': openapi.Schema(type=openapi.TYPE_STRING, description='URL видео матча'),
            'match_date': openapi.Schema(type=openapi.TYPE_STRING, format='date', description='Дата матча (формат YYYY-MM-DD)'),
            'match_time': openapi.Schema(type=openapi.TYPE_STRING, format='time', description='Время матча (формат HH:MM без секунд)'),
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
    team_away_id = request.data.get('team_away')
    score_home = request.data.get('score_home')
    score_away = request.data.get('score_away')
    location = request.data.get('location')
    division = request.data.get('division')
    match_date = request.data.get('match_date')
    match_time = request.data.get('match_time')

    try:
        team_away = Team.objects.get(id=team_away_id)
    except Team.DoesNotExist:
        return Response({'error': 'Гостевая команда не найдена'}, status=status.HTTP_400_BAD_REQUEST)

    match_data = {
        'team_home': team_home,
        'team_away': team_away.id,
        'score_home': score_home,
        'score_away': score_away,
        'location': location,
        'division': division,
        'match_date': match_date,
        'match_time': match_time,
    }

    serializer = MatchSerializer(data=match_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
