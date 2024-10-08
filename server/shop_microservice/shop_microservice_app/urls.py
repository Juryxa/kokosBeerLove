from django.urls import path

from .views.handlers_shop.create_product import create_product
from .views.handlers_shop.update_product import update_product


urlpatterns = [
    path('create_product/', create_product, name='create_product'),
    path('update_product/', update_product, name='update_product'),
]
