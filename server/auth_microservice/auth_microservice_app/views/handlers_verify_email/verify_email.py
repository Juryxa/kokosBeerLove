import logging
from random import randint
from smtplib import SMTPException

from django.conf import settings
from django.core.mail import BadHeaderError, send_mail
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ...models import CustomUser
from ...serializers import EmailVerificationSerializer

# Логирование ошибок
logger = logging.getLogger(__name__)


@swagger_auto_schema(
    method="post",
    operation_description="Отправка кода подтверждения на email. Код отправляется только на @mail.ru",
    tags=["verifyEmailHandlers"],
    request_body=EmailVerificationSerializer,
    responses={
        200: openapi.Response(
            description="Код отправлен на почту",
            examples={"application/json": {"code": "123456"}},
        ),
        400: openapi.Response(
            description="Некорректный email или email уже существует"
        ),
        500: openapi.Response(
            description="Внутренняя ошибка сервера (Internal Server Error)"
        ),
    },
)
@api_view(["POST"])
def verify_email(request):
    serializer = EmailVerificationSerializer(data=request.data)

    if serializer.is_valid():
        email = serializer.validated_data["email"]

        # Проверка, существует ли email в базе данных
        if CustomUser.objects.filter(email=email).exists():
            return Response(
                {"detail": "Пользователь с таким email уже зарегистрирован."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Генерация случайного 6-значного кода
        code = randint(100000, 999999)

        try:
            # Отправка кода на email
            send_mail(
                "Подтверждение регистрации",
                f"Ваш код подтверждения: {code}",
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False,
            )
        except (BadHeaderError, SMTPException) as e:
            # Логируем ошибку для администраторов, чтобы не потерять детали
            logger.error(f"Ошибка при отправке email: {str(e)}")

            # Возвращаем ответ с ошибкой 500
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Отправляем код клиенту для дальнейшей обработки
        return Response({"code": code}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
