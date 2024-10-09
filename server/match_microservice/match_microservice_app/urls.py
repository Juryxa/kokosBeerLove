from django.urls import path

from .views.heandlers_match.get_all_match import get_all_matches
from .views.heandlers_match.create_match import create_match
from .views.heandlers_match.create_club import create_team


urlpatterns = [
    path('get_all/', get_all_matches, name='get_all_matches'),
    path('create_team/', create_team, name='create_team'),
    path('create/', create_match, name='create_match'),
]