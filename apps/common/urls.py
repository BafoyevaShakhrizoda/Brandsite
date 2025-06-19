from django.urls import path
from apps.common.views import home, about, brands

urlpatterns=[
    path('',home, name='home'),
    path('about/',about, name='about'),
    path('brands/',brands, name='brands'),
]