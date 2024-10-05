from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken as JWTRefreshToken
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from ..serializers import LogoutSerializer

@swagger_auto_schema(
    method='post',
    operation_description="Выход пользователя. Refresh токен передаётся в cookie.",
    request_body=LogoutSerializer,
    responses={
        204: openapi.Response('Успешный выход'),
        400: openapi.Response('Токен не предоставлен'),
    }
)
@api_view(['POST'])
def logout(request):
    refresh_token = request.COOKIES.get('refresh_token')  # Получаем refresh токен из cookie

    if not refresh_token:
        return Response({'error': 'Refresh токен не предоставлен'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Проверка и деактивация токена
        token = JWTRefreshToken(refresh_token)

        # Если черный список активен, добавляем токен в черный список
        try:
            token.blacklist()
        except AttributeError:
            pass

        # Удаляем refresh_token из cookie
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie('refresh_token')
        return response

    except Exception as e:
        return Response({'error': f'Недействительный refresh токен: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
