from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.db import IntegrityError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken as JWTRefreshToken
from django.utils import timezone
from datetime import timedelta
from ..models import CustomUser, RefreshToken
from ..serializers import SignupSerializer


# Описание для функции signup
@swagger_auto_schema(
    method='post',
    operation_description="Регистрация нового пользователя",
    request_body=SignupSerializer,
    responses={
        201: openapi.Response(description="Пользователь успешно зарегистрирован, код отправлен на почту", examples={
            "application/json": {
                "message": "Код отправлен на почту"
            }
        }),
        400: openapi.Response(description="Некорректные данные запроса"),
        409: openapi.Response(description="Email уже существует"),
    }
)

@api_view(['POST'])
def signup(request):
    data = request.data
    email = data.get('email')

    # Сериализация данных
    serializer = SignupSerializer(data=request.data)

    if serializer.is_valid():
        try:
            # Попытка создать нового пользователя
            user = serializer.save()

            # Генерация JWT токенов
            refresh = JWTRefreshToken.for_user(user)
            access_token = refresh.access_token

            # Расчет времени истечения refresh токена
            expires_at = timezone.now() + timedelta(days=60)

            # Сохранение refresh токена в базу данных
            RefreshToken.objects.create(user=user, token=str(refresh), expires_at=expires_at)

            # Ответ клиенту с access токеном
            response = Response({
                'access': str(access_token),
            }, status=status.HTTP_201_CREATED)

            # Установка refresh токена в cookie
            response.set_cookie(
                key='refresh_token',
                value=str(refresh),
                httponly=True,  # Безопасность cookie
                expires=expires_at,
                secure=True,  # Secure=True для продакшена (HTTPS)
                samesite='Lax'  # Настройка SameSite для защиты от CSRF
            )
            return response
        except IntegrityError:
            # Обработка ошибки, если пользователь уже существует
            return Response({'error': 'Пользователь с таким email уже существует'}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)