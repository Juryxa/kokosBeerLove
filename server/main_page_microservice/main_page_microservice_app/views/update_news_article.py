from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.files.storage import default_storage
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes

from ..models import NewsArticle
@swagger_auto_schema(
    methods=['put', 'patch'],
    operation_description="Обновление существующей новости",
    manual_parameters=[
        openapi.Parameter('article_id', openapi.IN_PATH, description="ID статьи", type=openapi.TYPE_INTEGER)
    ],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'title': openapi.Schema(type=openapi.TYPE_STRING, description='Заголовок новости'),
            'text': openapi.Schema(type=openapi.TYPE_STRING, description='Текст новости'),
            'image': openapi.Schema(type=openapi.TYPE_FILE, description='Изображение новости')
        },
    ),
    responses={
        200: openapi.Response(description="Новость успешно обновлена"),
        404: openapi.Response(description="Новость не найдена"),
        400: openapi.Response(description="Неправильные данные"),
        401: openapi.Response(description="Неавторизован"),
    }
)
@api_view(['PUT', 'PATCH'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_news_article(request, article_id):
    try:
        # Ищем статью по id
        article = NewsArticle.objects.get(id=article_id)
    except NewsArticle.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Получаем данные для обновления
    title = request.data.get('title', article.title)
    text = request.data.get('text', article.text)
    image = request.FILES.get('image')  # Проверяем, есть ли новое изображение

    # Обновляем поля
    article.title = title
    article.text = text

    # Если новое изображение предоставлено, сохраняем его
    if image:
        # Удаляем старое изображение, если оно было
        if article.image:
            default_storage.delete(article.image.path)
        # Сохраняем новое изображение
        image_path = default_storage.save(f"news_images/{image.name}", image)
        article.image = image_path

    # Сохраняем изменения
    article.save()

    # Возвращаем успешный ответ
    return Response(status=status.HTTP_200_OK)