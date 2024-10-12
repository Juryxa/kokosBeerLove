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
    operation_description="Получение следующих 4 матчей, начиная с указанного количества открытых видео.",
    manual_parameters=[
        openapi.Parameter('cur_cnt_video', openapi.IN_QUERY, description="Текущее количество открытых видео",
                          type=openapi.TYPE_INTEGER)
    ],
    responses={200: openapi.Response(
        description="Успешный ответ с данными матчей",
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
                    "match_date": "2024-11-10",
                    "match_time": "14:00:00"
                }
            ]
        }
    )}
)
@api_view(['GET'])
def get_next_matches(request):
    # Получаем текущее количество открытых видео
    cur_cnt_video = int(request.GET.get('cur_cnt_video', 0))

    # Извлекаем следующие 4 матча, начиная с текущего количества
    next_matches = Match.objects.all().order_by('match_date', 'match_time')[cur_cnt_video:cur_cnt_video + 4]

    # Сериализуем данные
    serializer = MatchSerializer(next_matches, many=True)
    return Response(serializer.data)
