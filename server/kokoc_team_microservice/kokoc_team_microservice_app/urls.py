from django.urls import path
from .views.handlers_players.get_all_players import get_all_players
from .views.handlers_about_fckokoc.update_info_fc_kokoc import update_info_fc_kokoc
from .views.handlers_about_fckokoc.get_info_fc_kokoc import get_info_fc_kokoc


urlpatterns = [
    path('get_all_players/', get_all_players, name='get_all_players'),
    path('get_info_club/', get_info_fc_kokoc, name='get_info_fc_kokoc'),
    path('info_club/update/', update_info_fc_kokoc, name='update_info_fc_kokoc'),
]