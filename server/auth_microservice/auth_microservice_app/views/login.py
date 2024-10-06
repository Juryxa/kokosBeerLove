from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken as JWTRefreshToken
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils import timezone

from ..models import CustomUser, RefreshToken as RefreshTokenModel
from ..serializers import LoginSerializer


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

    # Проверяем статус пользователя (is_superuser)
    is_superuser = user.is_superuser

    # Проверяем, есть ли уже существующий refresh токен в базе данных для этого пользователя
    try:
        db_refresh_token = RefreshTokenModel.objects.get(user=user)
        if db_refresh_token.expires_at < timezone.now():
            # Если токен истек, удаляем его и создаем новый
            db_refresh_token.delete()
            raise RefreshTokenModel.DoesNotExist
    except RefreshTokenModel.DoesNotExist:
        # Генерация нового refresh токена
        refresh = JWTRefreshToken.for_user(user)

        # Сохраняем новый refresh токен в базе данных
        db_refresh_token = RefreshTokenModel.objects.create(
            user=user,
            token=str(refresh),
            expires_at=timezone.now() + timezone.timedelta(days=60)  # Устанавливаем срок действия токена
        )

    # Генерация нового access токена на основе refresh токена
    access_token = JWTRefreshToken(db_refresh_token.token).access_token

    response = Response({
        'access': str(access_token),
        'is_superuser': is_superuser
    }, status=status.HTTP_200_OK)

    # Настройка cookie для refresh токена
    response.set_cookie(
        key='refresh_token',
        value=db_refresh_token.token,
        httponly=True,  # Защита от JavaScript доступа
        secure=False,  # Для production среды установите True (для HTTPS)
        samesite='Lax',  # Защита от CSRF
        max_age=60 * 60 * 24 * 60  # Время жизни refresh токена (60 дней)
    )

    return response
