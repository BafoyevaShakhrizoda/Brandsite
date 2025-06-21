from django.shortcuts import render
from django.views.generic import ListView
from apps.catalog.models import Product

class FeaturedProductsView(ListView):
    model = Product
    template_name = 'home.html'
    context_object_name = 'featured_products'

    def get_queryset(self):
        return Product.objects.filter(is_featured = True)[:6]

def about(request):
    return render(request,'about.html', context={ 'title': 'About' })

def brands(request):
    return render(request,'brands.html', context={ 'title': 'Brands' })