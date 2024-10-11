from django.urls import path
from .views.handlers_auth.verify_email import verify_email
from .views.handlers_auth.login import login
from .views.handlers_auth.logout import logout
from .views.handlers_auth.signup import signup
from .views.handlers_auth.refresh_token import refresh_token

from .views.handlers_profile.update_profile import update_profile

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('verify-email/', verify_email, name='verify_email'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('refresh/', refresh_token, name='refresh_token'),

    path('profile/update/', update_profile, name='update_profile'),
]