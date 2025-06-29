from django.urls import path
from .import views
urlpatterns = [
    path('categories/', views.category_list, name='category_list'),
    path('categories/<slug:slug>/', views.category_detail, name='category_detail'),
    path('categories/<slug:category_slug>/<slug:product_slug>/', views.product, name='product_detail'),
]
