from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.files.storage import default_storage
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from ..models import NewsArticle


@swagger_auto_schema(
    method='post',
    operation_description="Создание новой новости",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['title', 'text', 'image'],
        properties={
            'title': openapi.Schema(type=openapi.TYPE_STRING, description='Заголовок новости'),
            'text': openapi.Schema(type=openapi.TYPE_STRING, description='Текст новости'),
            'image': openapi.Schema(type=openapi.TYPE_FILE, description='Изображение новости')
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
    image = request.FILES.get('image')  # Получаем изображение из запроса

    image_path = default_storage.save(f"news_images/{image.name}", image)

    if title or text or image:
        # Создание и сохранение новости
        NewsArticle.objects.create(title=title, text=text, image=image_path)

        # Возвращаем успешный ответ
        return Response(status=status.HTTP_201_CREATED)

    # Если обязательные данные не переданы, возвращаем ошибку
    return Response(status=status.HTTP_400_BAD_REQUEST)
