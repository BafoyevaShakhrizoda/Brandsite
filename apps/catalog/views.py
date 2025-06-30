from django.shortcuts import render,get_object_or_404
from apps.catalog.models import Category,Product


def category_list(request):
    categories = Category.objects.all()
    return render(request,'category_list.html', context= { 'categories': categories })

def category_detail(request,slug):
    category = get_object_or_404(Category, slug=slug)
    products = Product.objects.filter(category= category)
    return render(request,'products.html', { 
                                                    'category': category,
                                                    'products': products,
                                                    })

def product(request,category_slug,product_slug):
    product = get_object_or_404(Product, category__slug = category_slug, slug=product_slug, )
    return render(request,'product.html', { 
                                                   'product': product,
                                                   })
