from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken as JWTRefreshToken


@api_view(['POST'])
def refresh_token(request):
    refresh_token = request.COOKIES.get('refresh_token')  # Получаем refresh токен из cookie

    if not refresh_token:
        return Response({'error': 'Refresh токен не предоставлен'}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        # Проверка валидности refresh токена
        token = JWTRefreshToken(refresh_token)

        # Генерация нового access токена
        new_access_token = token.access_token

        # Возвращаем новый access токен
        return Response({
            'access': str(new_access_token)
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': 'Недействительный refresh токен'}, status=status.HTTP_401_UNAUTHORIZED)