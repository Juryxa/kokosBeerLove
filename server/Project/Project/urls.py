from django.urls import path, include

urlpatterns = [
    path('api/', include('auth_microservice.urls')),  # Включаем маршруты auth_microservice
]