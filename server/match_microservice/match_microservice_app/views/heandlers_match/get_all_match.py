from django.views.decorators.cache import cache_page
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ...models import Match
from ...serializers import MatchSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from datetime import datetime

@swagger_auto_schema(
    method='get',
    operation_description="Получение списка всех матчей. Сначала выводятся предстоящие матчи, затем прошедшие. Данные о team_away включают название и логотип команды.",
    responses={200: openapi.Response(
        description="Успешный ответ с данными всех матчей",
        examples={
            "application/json": [
                {
                    "team_home": "Команда Х",
                    "team_away_name": "Команда Y",
                    "team_away_logo_url": "http://example.com/logo_y.jpg",
                    "score_home": 2,
                    "score_away": 1,
                    "location": "Стадион 1",
                    "division": "Премьер-лига",
                    "video_url": "http://example.com/match_video",
                    "match_date": "2024-10-09",
                    "match_time": "14:00:00"
                }
            ]
        }
    )}
)
@api_view(['GET'])
def get_all_matches(request):
    # Текущее время
    now = datetime.now()

    # Получаем предстоящие матчи (match_date больше или равно текущей дате)
    upcoming_matches = Match.objects.filter(
        match_date__gte=now.date()
    ).exclude(
        match_date=now.date(), match_time__lte=now.time()
    ).order_by('match_date', 'match_time')

    # Получаем прошедшие матчи (match_date меньше текущей даты)
    past_matches = Match.objects.filter(
        match_date__lt=now.date()
    ).order_by('-match_date', '-match_time')

    # Объединяем оба набора данных
    matches = list(upcoming_matches) + list(past_matches)

    # Сериализуем данные
    serializer = MatchSerializer(matches, many=True)
    return Response(serializer.data)