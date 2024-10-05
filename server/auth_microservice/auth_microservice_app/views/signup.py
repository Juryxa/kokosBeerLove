from email_validator import validate_email, EmailNotValidError
import smtplib
import dns.resolver
from django.core.mail import send_mail
from random import randint
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken as JWTRefreshToken
from django.utils import timezone
from datetime import timedelta
from ..models import CustomUser, RefreshToken, VerificationCode
from ..serializers import SignupSerializer, VerifyEmailSerializer
from django.conf import settings


def check_email_exists(email):
    domain = email.split('@')[1]
    try:
        # Получение MX-записей домена
        records = dns.resolver.resolve(domain, 'MX')
        mx_record = str(records[0].exchange)

        # Подключение к SMTP серверу
        server = smtplib.SMTP(mx_record)
        server.set_debuglevel(0)
        server.helo(server.local_hostname)

        # Указание отправителя
        server.mail('noreply@yourdomain.com')  # Замените на действующий адрес вашего сервера или приложения

        # Проверка email
        code, message = server.rcpt(email)

        # Закрытие соединения
        server.quit()

        return code == 250
    except Exception:
        return False


@api_view(['POST'])
def signup(request):
    data = request.data
    email = data.get('email')
    username = data.get('username')

    # Проверка валидности email с использованием email-validator
    try:
        validation = validate_email(email)
        email = validation.email
    except EmailNotValidError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # Дополнительная проверка существования email
    if not check_email_exists(email):
        return Response({'error': 'Email не существует'}, status=status.HTTP_400_BAD_REQUEST)

    # Сериализация данных
    serializer = SignupSerializer(data=request.data)

    if serializer.is_valid():
        # Создание нового пользователя
        user = serializer.save()
        user.is_verified = False
        user.save()

        # Генерация кода подтверждения
        code = str(randint(100000, 999999))
        VerificationCode.objects.create(email=email, code=code)

        # Отправка кода на email
        send_mail(
            'Код подтверждения',
            f'Ваш код подтверждения: {code}',
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False,
        )

        # Генерация JWT токенов
        refresh = JWTRefreshToken.for_user(user)

        # Расчет времени истечения refresh токена
        expires_at = timezone.now() + timedelta(days=60)

        # Сохранение refresh токена в базу данных
        RefreshToken.objects.create(user=user, token=str(refresh), expires_at=expires_at)

        # Ответ клиенту
        response = Response({
            'message': 'Код отправлен на почту',
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

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def verify_email(request):
    serializer = VerifyEmailSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        code = serializer.validated_data['code']

        try:
            verification_code = VerificationCode.objects.get(email=email, code=code)
            user = CustomUser.objects.get(email=email)
            user.is_verified = True
            user.save()
            verification_code.delete()
            return Response({'message': 'Email успешно подтвержден'}, status=status.HTTP_200_OK)
        except VerificationCode.DoesNotExist:
            return Response({'error': 'Неверный код'}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def resend_verification_code(request):
    email = request.data.get('email')

    try:
        # Генерация нового кода
        code = str(randint(100000, 999999))
        VerificationCode.objects.update_or_create(email=email, defaults={'code': code})

        # Отправка нового кода на email
        send_mail(
            'Новый код подтверждения',
            f'Ваш новый код подтверждения: {code}',
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False,
        )

        return Response({'message': 'Код повторно отправлен на email'}, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'Пользователь с таким email не существует'}, status=status.HTTP_400_BAD_REQUEST)
