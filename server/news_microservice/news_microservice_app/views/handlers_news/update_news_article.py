from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes

from ...models import NewsArticle

@swagger_auto_schema(
    methods=['put', 'patch'],
    operation_description="Обновление существующей новости с указанием URL локального изображения. ВАЖНО ПЕРЕДАТЬ access token, если в payload будет is_superuser == true(то пользователь-администратор), иначе ответит 401 или 403",
    manual_parameters=[
        openapi.Parameter('article_id', openapi.IN_PATH, description="ID статьи", type=openapi.TYPE_INTEGER)
    ],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'title': openapi.Schema(type=openapi.TYPE_STRING, description='Заголовок новости'),
            'text': openapi.Schema(type=openapi.TYPE_STRING, description='Текст новости'),
            'image_url': openapi.Schema(type=openapi.TYPE_STRING, description='URL локального изображения новости')
        },
    ),
    responses={
        200: openapi.Response(description="Новость успешно обновлена"),
        404: openapi.Response(description="Новость не найдена"),
        400: openapi.Response(description="Неправильные данные"),
        401: openapi.Response(description="Неавторизован, нужно перенаправить со стороны frontend в перехватчик api/refresh/ другого микросервиса"),
        403: openapi.Response(description="Нет прав доступа"),
    }
)
@api_view(['PUT', 'PATCH'])
@authentication_classes([JWTTokenUserAuthentication])
@permission_classes([IsAuthenticated])
def update_news_article(request, article_id):
    # Проверка наличия is_superuser в токене
    if not request.user.is_superuser:
        return Response({'error': 'У вас нет прав доступа для обновления новостей'}, status=status.HTTP_403_FORBIDDEN)

    try:
        # Ищем статью по id
        article = NewsArticle.objects.get(id=article_id)
    except NewsArticle.DoesNotExist:
        return Response({'error': 'Новость не найдена'}, status=status.HTTP_404_NOT_FOUND)

    # Получаем данные для обновления
    title = request.data.get('title', article.title)
    text = request.data.get('text', article.text)
    image_url = request.data.get('image_url', article.image)  # Получаем новый URL изображения или оставляем старый

    # Обновляем поля
    article.title = title
    article.text = text
    article.image = image_url  # Обновляем URL изображения

    # Сохраняем изменения
    article.save()

    return Response(status=status.HTTP_200_OK)
