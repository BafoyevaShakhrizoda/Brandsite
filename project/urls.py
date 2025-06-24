from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from apps.common.views import FeaturedProductsView,BrandsView
from apps.catalog import views
from django.views.generic import RedirectView

urlpatterns = [
    path('', RedirectView.as_view(url='home/')),  
    path('admin/', admin.site.urls),
    path('home/', FeaturedProductsView.as_view(), name='home'),
    path('brands/', BrandsView.as_view(), name='brands'),
    path('', include('apps.common.urls')),
    path('categories/', views.category_list, name='category_list'),
    path('categories/<slug:slug>/', views.category_detail, name='category_detail'),
    path('categories/<slug:category_slug>/<slug:product_slug>/', views.product, name='product_detail'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)