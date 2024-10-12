from rest_framework import status
from django.views.decorators.cache import cache_page
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ...models import Match
from ...serializers import MatchSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@swagger_auto_schema(
    method='get',
    operation_description="Получение информации о конкретном матче по ID",
    manual_parameters=[
        openapi.Parameter('id', openapi.IN_PATH, description="ID матча", type=openapi.TYPE_INTEGER)
    ],
    responses={
        200: openapi.Response(description="Информация о матче успешно получена", schema=MatchSerializer),
        404: openapi.Response(description="Матч не найден"),
    }
)
@api_view(['GET'])
def get_match_by_id(request, id):
    try:
        match = Match.objects.get(id=id)
        serializer = MatchSerializer(match)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Match.DoesNotExist:
        return Response({'error': 'Матч не найден'}, status=status.HTTP_404_NOT_FOUND)
