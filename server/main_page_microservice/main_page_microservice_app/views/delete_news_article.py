from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.files.storage import default_storage

from ..models import NewsArticle

@swagger_auto_schema(
    method='delete',
    operation_description="Удаление новости по ID",
    manual_parameters=[
        openapi.Parameter('article_id', openapi.IN_PATH, description="ID статьи", type=openapi.TYPE_INTEGER),
    ],
    responses={
        204: openapi.Response(description="Новость успешно удалена"),
        404: openapi.Response(description="Новость не найдена"),
    }
)
@api_view(['DELETE'])
def delete_news_article(request, article_id):
    try:
        # Поиск новости по id
        article = NewsArticle.objects.get(id=article_id)

        # Если у статьи есть изображение, удаляем его
        if article.image:
            default_storage.delete(article.image.path)

        # Удаляем новость из базы данных
        article.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
    except NewsArticle.DoesNotExist:
        return Response({'error': 'Новость не найдена'}, status=status.HTTP_404_NOT_FOUND)
