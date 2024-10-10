from django.urls import path
from .views.get_all_players import get_all_players


urlpatterns = [
    path('get_all_players/', get_all_players, name='get_all_players'),

]