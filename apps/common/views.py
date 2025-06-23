from django.shortcuts import render
from django.views.generic import ListView
from apps.catalog.models import Product, Brand
from django.urls import reverse
from django.utils.text import slugify

class FeaturedProductsView(ListView):
    model = Product
    template_name = 'home.html'
    context_object_name = 'featured_products'

    def get_queryset(self):
        return Product.objects.filter(is_featured = True)[:6]

def about(request):
    return render(request,'about.html', context={ 'title': 'About' })

class BrandsView(ListView):
    model = Brand
    template_name = 'brands.html'
    context_object_name = 'brands_catalog'
    
    def get_queryset(self):
        return Brand.objects.all()[:5]