from django.urls import path

from .views.create_news_article import create_news_article
from .views.update_news_article import update_news_article
from .views.delete_news_article import delete_news_article
from .views.get_all_news_articles import get_all_news_articles

urlpatterns = [
    path('get_all/', get_all_news_articles, name='get_all_news_articles'),
    path('create/', create_news_article, name='create_news_article'),
    path('<int:article_id>/update/', update_news_article, name='update_news_article'),
    path('<int:article_id>/delete/', delete_news_article, name='delete_news_article'),
]
