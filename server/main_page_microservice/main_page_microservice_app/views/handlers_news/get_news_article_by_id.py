from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import api_view
from rest_framework.response import Response
from main_page_microservice.main_page_microservice_app.models import NewsArticle
from main_page_microservice.main_page_microservice_app.serializers import NewsArticleSerializer
from rest_framework import status



@swagger_auto_schema(
    method='get',
    operation_description="Получить новостную статью по идентификатору",
    manual_parameters=[
        openapi.Parameter('article_id', openapi.IN_PATH, description="ID статьи", type=openapi.TYPE_INTEGER)
    ],
    responses={
        200: NewsArticleSerializer(),
        404: 'Статья не найдена'
    }
)

# Новый эндпоинт для получения статьи по ID
@api_view(['GET'])
def get_news_article_by_id(request, article_id):
    try:
        article = NewsArticle.objects.get(id=article_id)
    except NewsArticle.DoesNotExist:
        return Response({"error": "Статья не найдена"}, status=status.HTTP_404_NOT_FOUND)

    serializer = NewsArticleSerializer(article)
    return Response(serializer.data)