from django.urls import path

from .views.heandlers_match.get_all_match import get_all_matches
from .views.heandlers_match.create_match import create_match
from .views.heandlers_match.create_club import create_team
from .views.heandlers_match.update_team_details import update_about_fc_kokoc
from .views.heandlers_match.get_about_fc_kokoc import get_about_fc_kokoc

urlpatterns = [
    path('get_all/', get_all_matches, name='get_all_matches'),
    path('create_team/', create_team, name='create_team'),
    path('create/', create_match, name='create_match'),
    path('about_fc/', get_about_fc_kokoc, name='get_about_fc_kokoc'),
    path('about_fc/update/', update_about_fc_kokoc, name='update_about_fc_kokoc'),
]