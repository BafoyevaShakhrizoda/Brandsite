from apps.common.views import  about
from django.urls import path 
from . import views


urlpatterns=[
    
    path('about/',about, name='about'),
    path('register/', views.register_view, name= 'register'),
    path('login/', views.login_view, name= 'login'),
    path('logout/', views.logout_view, name= 'logout'),
]
