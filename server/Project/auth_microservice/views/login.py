from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from auth_microservice.models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken as JWTRefreshToken


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

    # Генерация JWT токенов
    refresh = JWTRefreshToken.for_user(user)
    access_token = refresh.access_token

    # Возвращаем успех и информацию о пользователе
    return Response({
        'access': str(access_token),
        'refresh': str(refresh),
        'is_superuser': is_superuser
    }, status=status.HTTP_200_OK)
