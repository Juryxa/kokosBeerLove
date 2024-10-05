from django.core.mail import send_mail
from random import randint
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.conf import settings
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from ..serializers import EmailVerificationSerializer


@swagger_auto_schema(
    method='post',
    operation_description="Отправка кода подтверждения на email",
    request_body=EmailVerificationSerializer,
    responses={
        200: openapi.Response(description="Код отправлен на почту", examples={
            "application/json": {
                "code": "123456"
            }
        }),
        400: openapi.Response(description="Некорректный email"),
    }
)
@api_view(['POST'])
def verify_email(request):
    serializer = EmailVerificationSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']

        # Генерация случайного 6-значного кода
        code = str(randint(100000, 999999))

        # Отправка кода на email
        send_mail(
            'Подтверждение регистрации',
            f'Ваш код подтверждения: {code}',
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False,
        )

        # Отправляем код клиенту для дальнейшей обработки
        return Response({'code': code}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
