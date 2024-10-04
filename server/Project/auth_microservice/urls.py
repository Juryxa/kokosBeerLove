from django.urls import path
from auth_microservice.views.signup import signup
from auth_microservice.views.refresh_token import refresh_token
from auth_microservice.views.login import login

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('refresh/', refresh_token, name='refresh_token'),
]