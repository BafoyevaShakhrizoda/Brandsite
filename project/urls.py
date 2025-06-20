from django.contrib import admin
from django.urls import path,include
from apps.common.views import FeaturedProductsView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', FeaturedProductsView.as_view(), name='home'),
    path('', include('apps.catalog.urls')),
    path('', include('apps.common.urls')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
