from django.urls import path

from .views.heandlers_match.get_all_match import get_all_matches
from .views.heandlers_match.create_match import create_match
from .views.heandlers_match.get_match_by_id import get_match_by_id


urlpatterns = [
    path('get_all/', get_all_matches, name='get_all_matches'),
    path('get_by_id/<int:id>/', get_match_by_id, name='get_by_id'),
    path('create/', create_match, name='create_match'),
]

