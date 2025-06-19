from django.shortcuts import render

def categories(request):
    return render(request,'category_list.html', context={ 'title': 'Categories' })

def products(request):
    return render(request,'products.html', context={ 'title': 'Products' })

def product(request):
    return render(request,'product.html', context={ 'title': 'Product' })
