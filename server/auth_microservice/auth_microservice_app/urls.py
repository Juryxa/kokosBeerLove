from django.urls import path
from .views.signup import signup, verify_email, resend_verification_code
from .views.refresh_token import refresh_token
from .views.login import login
from .views.logout import logout
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
        description="Документация для всех запросов API",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)
urlpatterns = [
    path('signup/', signup, name='signup'),
    path('verify-email/', verify_email, name='verify_email'),
    path('resend-verification-code/', resend_verification_code,
         name='resend_verification_code'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('refresh/', refresh_token, name='refresh_token'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]