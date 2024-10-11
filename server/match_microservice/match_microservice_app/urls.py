from django.urls import path

from .views.heandlers_match.get_all_match import get_all_matches
from .views.heandlers_match.create_match import create_match
from .views.heandlers_match.get_match_by_id import get_match_by_id
from .views.heandlers_match.update_match import update_match
from .views.heandlers_match.delete_match_by_id import delete_match_by_id
from .views.heandlers_match.get_last_three_matches import get_last_three_matches


urlpatterns = [
    path('get_last_three/', get_last_three_matches, name='get_last_three'),
    path('get_all/', get_all_matches, name='get_all_matches'),
    path('get_by_id/<int:id>/', get_match_by_id, name='get_by_id'),
    path('create/', create_match, name='create_match'),
    path('update/<int:match_id>/', update_match, name='update_by_id'),
    path('delete/<int:match_id>/', delete_match_by_id, name='delete_match_by_id'),

]

