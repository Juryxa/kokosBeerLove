from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils import timezone

from ...models import CustomUser, RefreshToken as RefreshTokenModel
from ...serializers import LoginSerializer
from ...custom_tokens import CustomRefreshToken  # Используем кастомный токен

@swagger_auto_schema(
    method='post',
    operation_description="Логин пользователя",
    request_body=LoginSerializer,
    responses={
        200: openapi.Response('Успешная аутентификация'),
        401: openapi.Response('Неверный email или пароль'),
    }
)
@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Проверяем, есть ли пользователь с таким email
    try:
        user = CustomUser.objects.get(email=email)
    except CustomUser.DoesNotExist:
        return Response({'error': 'Неправильный пароль или email'}, status=status.HTTP_404_NOT_FOUND)

    # Проверяем правильность пароля
    user = authenticate(request, email=email, password=password)
    if user is None:
        return Response({'error': 'Неправильный пароль или email'}, status=status.HTTP_400_BAD_REQUEST)

    # Удаляем все существующие refresh токены пользователя
    RefreshTokenModel.objects.filter(user=user).delete()

    # Генерация нового кастомного refresh токена
    refresh = CustomRefreshToken.for_user(user)

    # Сохраняем новый refresh токен в базе данных
    db_refresh_token = RefreshTokenModel.objects.create(
        user=user,
        token=str(refresh),
        expires_at=timezone.now() + timezone.timedelta(days=60)
    )

    # Получаем access токен из кастомного refresh токена
    access_token = refresh.access_token

    # Подготовка ответа с access токеном
    response = Response({
        'access': str(access_token),
    }, status=status.HTTP_200_OK)

    # Настройка cookie для refresh токена
    response.set_cookie(
        key='refresh_token',
        value=str(refresh),
        httponly=True,  # Защита от JavaScript доступа
        secure=False,   # Установите True в production при использовании HTTPS
        samesite='Lax',
        max_age=60 * 60 * 24 * 60
    )

    return response
