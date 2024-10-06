from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

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
    }
)
@api_view(['POST'])
def create_news_article(request):
    title = request.data.get('title')
    text = request.data.get('text')
    image_url = request.data.get('image_url')  # Получаем URL изображения

    if title and text and image_url:
        # Сохранение новости в базе данных с URL изображения
        NewsArticle.objects.create(title=title, text=text, image=image_url)
        return Response(status=status.HTTP_201_CREATED)

    return Response({'error': 'Отсутствуют обязательные поля'}, status=status.HTTP_400_BAD_REQUEST)
