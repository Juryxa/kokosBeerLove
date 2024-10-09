from django.urls import path

from .views.handlers_news.create_news_article import create_news_article
from .views.handlers_news.update_news_article import update_news_article
from .views.handlers_news.delete_news_article import delete_news_article
from .views.handlers_news.get_all_news_articles import get_all_news_articles
from .views.handlers_news.get_news_article_by_id import get_news_article_by_id
from .views.heandlers_match.get_all_match import get_all_matches
from .views.heandlers_match.create_match import create_match
from .views.heandlers_match.create_club import create_team

urlpatterns = [
    path('get_all/', get_all_news_articles, name='get_all_news_articles'),
    path('<int:article_id>/', get_news_article_by_id, name='get_news_article_by_id'),
    path('create/', create_news_article, name='create_news_article'),
    path('<int:article_id>/update/', update_news_article, name='update_news_article'),
    path('<int:article_id>/delete/', delete_news_article, name='delete_news_article'),
    path('get_all_matches/', get_all_matches, name='get_all_matches'),
    path('create_team/', create_team, name='create_team'),
    path('create_match/', create_match, name='create_match'),
]
