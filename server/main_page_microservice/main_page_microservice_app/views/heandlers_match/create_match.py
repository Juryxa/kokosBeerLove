from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ...models import Match
from ...serializers import MatchSerializer
from drf_yasg.utils import swagger_auto_schema

@swagger_auto_schema(
    method='post',
    request_body=MatchSerializer,
    operation_description="Создать новый матч",
    responses={
        201: 'Матч успешно создан',
        400: 'Неверный запрос'
    }
)
@api_view(['POST'])
def create_match(request):
    serializer = MatchSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
