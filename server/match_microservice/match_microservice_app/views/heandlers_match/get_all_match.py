from django.views.decorators.cache import cache_page
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ...models import Match
from ...serializers import MatchSerializer
from drf_yasg.utils import swagger_auto_schema

@swagger_auto_schema(
    method='get',
    operation_description="Получить все матчи",
    responses={200: MatchSerializer(many=True)},
)
@api_view(['GET'])
@cache_page(60 * 20)
def get_all_matches(request):
    matches = Match.objects.all()
    serializer = MatchSerializer(matches, many=True)
    return Response(serializer.data)
