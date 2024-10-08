from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ...models import Team
from ...serializers import TeamSerializer
from drf_yasg.utils import swagger_auto_schema
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication

@swagger_auto_schema(
    method='post',
    request_body=TeamSerializer,
    operation_description="Создать новую команду",
    responses={
        201: 'Команда успешно создана',
        400: 'Неверный запрос   '
    }
)
@authentication_classes([JWTTokenUserAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def create_team(request):
    serializer = TeamSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

