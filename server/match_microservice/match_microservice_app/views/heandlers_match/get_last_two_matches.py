from django.views.decorators.cache import cache_page
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ...models import Match
from ...serializers import MatchSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@swagger_auto_schema(
    method='get',
    operation_description="Получение последних 3 матчей. Данные о team_away включают название и логотип команды.",
    responses={200: openapi.Response(
        description="Успешный ответ с данными последних 3 матчей",
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
def get_last_two_matches(request):
    # Sort by id descending to get the latest 3 matches
    matches = Match.objects.all().order_by('-id')[:2]
    serializer = MatchSerializer(matches, many=True)
    return Response(serializer.data)
