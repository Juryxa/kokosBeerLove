from django.urls import path
from auth_microservice.views.signup import signup
from auth_microservice.views.refresh_token import refresh_token
from auth_microservice.views.login import login
from auth_microservice.views.logout import logout

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('refresh/', refresh_token, name='refresh_token'),

]