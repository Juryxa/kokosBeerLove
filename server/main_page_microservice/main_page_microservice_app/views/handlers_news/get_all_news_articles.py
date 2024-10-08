from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import api_view
from rest_framework.response import Response
from main_page_microservice.main_page_microservice_app.models import NewsArticle
from main_page_microservice.main_page_microservice_app.serializers import NewsArticleSerializer
from rest_framework import status


@swagger_auto_schema(
    method='get',
    operation_description="Получение всех новостей",
    responses={200: openapi.Response(description="Список всех новостей", examples={
        "application/json": [
            {
                "id": 1,
                "title": "Заголовок новости",
                "text": "Текст новости",
                "image": "news_images/image.jpg",
                "created_at": "2024-10-06T12:00:00Z"
            }
        ]
    })}
)
@api_view(['GET'])
def get_all_news_articles(request):
    articles = NewsArticle.objects.all()
    serializer = NewsArticleSerializer(articles, many=True)
    return Response(serializer.data)

