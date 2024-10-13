from datetime import timedelta

from django.db import IntegrityError
from django.utils import timezone
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from ...models import RefreshToken as RefreshTokenModel
from ...serializers import SignupSerializer


@swagger_auto_schema(
    method="post",
    operation_description="Регистрация нового пользователя",
    request_body=SignupSerializer,
    responses={
        201: openapi.Response(
            description="Пользователь успешно зарегистрирован"),
        400: openapi.Response(
            description="Некорректные данные запроса"),
        409: openapi.Response(
            description="Email уже существует"),
    },
)
@api_view(["POST"])
def signup(request):
    data = request.data
    email = data.get("email")

    # Сериализация данных
    serializer = SignupSerializer(data=request.data)

    if serializer.is_valid():
        try:
            # Попытка создать нового пользователя
            user = serializer.save()

            # Устанавливаем, что пользователь не является суперпользователем
            user.is_superuser = False
            user.save()

            # Генерация JWT токенов
            refresh = RefreshToken.for_user(user)

            # Добавляем статус суперпользователя в токены
            if user.is_superuser:
                refresh["is_superuser"] = True

            access_token = refresh.access_token
            if user.is_superuser:
                access_token["is_superuser"] = True

            # Расчет времени истечения refresh токена
            expires_at = timezone.now() + timedelta(days=60)

            # Сохранение refresh токена в базу данных
            RefreshTokenModel.objects.create(
                user=user, token=str(refresh), expires_at=expires_at
            )

            # Ответ клиенту с access токеном
            response = Response(
                {
                    "access": str(access_token),
                },
                status=status.HTTP_201_CREATED,
            )

            # Установка refresh токена в cookie
            response.set_cookie(
                key="refresh_token",
                value=str(refresh),
                httponly=True,  # Безопасность cookie
                expires=expires_at,
                secure=False,  # Установите True для продакшена
                samesite="Lax",  # Настройка SameSite для защиты от CSRF
            )
            return response
        except IntegrityError:
            return Response(
                {"error": "Пользователь с таким email уже существует"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
