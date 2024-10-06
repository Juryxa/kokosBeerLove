from django.urls import path
from .views.verify_email import verify_email
from .views.login import login
from .views.logout import logout
from .views.signup import signup
from .views.refresh_token import refresh_token

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('verify-email/', verify_email, name='verify_email'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('refresh/', refresh_token, name='refresh_token'),
]