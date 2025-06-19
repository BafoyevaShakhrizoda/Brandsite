from django.urls import path
from apps.catalog.views import categories, products, product

urlpatterns = [
    path('category_list/', categories, name='categories'),
    path('products/', products, name='products'),
    path('product/', product, name='product'),
]
