from apps.common.views import  about, brands
from django.urls import path 

urlpatterns=[
    path('about/',about, name='about'),
    path('brands/',brands, name='brands'),
]
