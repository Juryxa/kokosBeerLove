from django.urls import path

from .views.handlers_shop.create_product import create_product
from .views.handlers_shop.delete_product import delete_product
from .views.handlers_shop.update_product import update_product
from .views.handlers_shop.get_all_products import get_all_products

urlpatterns = [
    path('create_product/', create_product, name='create_product'),
    path('update_product/<int:product_id>/', update_product, name='update_product'),
    path('get_all/', get_all_products, name='get_all_products'),
    path('delete_product/<int:product_id>/', delete_product, name='delete_product'),
]
