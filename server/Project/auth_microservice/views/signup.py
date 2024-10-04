from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from auth_microservice.models import CustomUser, RefreshToken
from auth_microservice.serializers import SignupSerializer
from rest_framework_simplejwt.tokens import RefreshToken as JWTRefreshToken
from django.utils import timezone
from datetime import timedelta

@api_view(['POST'])
def signup(request):
    data = request.data
    email = data.get('email')

    # Проверка, есть ли пользователь с таким email
    if CustomUser.objects.filter(email=email).exists():
        return Response({'error': 'Пользователь с таким email уже существует'}, status=status.HTTP_400_BAD_REQUEST)

    # Если email не занят, то создаём нового пользователя
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        # Генерация JWT токенов (access и refresh)
        refresh = JWTRefreshToken.for_user(user)
        access_token = refresh.access_token

        # Сохранение refresh токена в базу данных
        expires_at = timezone.now() + timedelta(days=60)  # Время жизни refresh токена
        RefreshToken.objects.create(user=user, token=str(refresh), expires_at=expires_at)

        # Устанавливаем refresh токен в HTTP-only cookie
        response = Response({
            'access': str(access_token),
        }, status=status.HTTP_201_CREATED)
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,  # Установим cookie как HTTP-only для безопасности
            expires=expires_at,
            secure=True,  # Используйте secure=True на продакшене для HTTPS
            samesite='Lax'  # Настройка SameSite для защиты от CSRF
        )
        return response

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

