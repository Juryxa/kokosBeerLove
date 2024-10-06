from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes

from ..models import NewsArticle

@swagger_auto_schema(
    method='post',
    operation_description="Создание новой новости с указанием URL изображения",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['title', 'text', 'image_url'],
        properties={
            'title': openapi.Schema(type=openapi.TYPE_STRING, description='Заголовок новости'),
            'text': openapi.Schema(type=openapi.TYPE_STRING, description='Текст новости'),
            'image_url': openapi.Schema(type=openapi.TYPE_STRING, description='URL изображения новости')
        },
    ),
    responses={
        201: openapi.Response(description="Новость успешно создана"),
        400: openapi.Response(description="Неправильные данные"),
        401: openapi.Response(description="Неавторизован"),
        403: openapi.Response(description="Нет прав доступа"),
    }
)
@api_view(['POST'])
@authentication_classes([JWTAuthentication])  # JWT аутентификация
@permission_classes([IsAuthenticated])  # Требует, чтобы пользователь был авторизован
def create_news_article(request):
    # Проверка наличия is_superuser в токене
    if not request.user.is_superuser:
        return Response({'error': 'У вас нет прав доступа для создания новостей'}, status=status.HTTP_403_FORBIDDEN)

    # Проверка на наличие всех необходимых полей
    title = request.data.get('title')
    text = request.data.get('text')
    image_url = request.data.get('image_url')  # Получаем URL изображения

    if title and text and image_url:
        # Сохранение новости в базе данных с URL изображения
        NewsArticle.objects.create(title=title, text=text, image=image_url)
        return Response(status=status.HTTP_201_CREATED)

    # Если отсутствуют обязательные поля, возвращаем ошибку
    return Response({'error': 'Отсутствуют обязательные поля'}, status=status.HTTP_400_BAD_REQUEST)
