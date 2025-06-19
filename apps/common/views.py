from django.shortcuts import render

def home(request):
    return render(request,'home.html', context={ 'title': 'Home' })

def about(request):
    return render(request,'about.html', context={ 'title': 'About' })

def brands(request):
    return render(request,'brands.html', context={ 'title': 'Brands' })