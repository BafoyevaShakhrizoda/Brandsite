from django.shortcuts import render, redirect
from django.views.generic import ListView
from apps.catalog.models import Product, Brand
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib import messages


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


def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, 'Registration successful!')
            return redirect('home')
    else:
        form = UserCreationForm()   
    return render(request, 'accounts/register.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data = request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password = password)
            if user is not None:
                login(request,user)
                messages.success(request, f"You are now logged in as {username}.")
                return redirect('home')
        else:
            messages.error(request,'Invalid username or password.')
    else:
        form = AuthenticationForm()
        return render(request, 'accounts/login.html', {'form': form})


def logout_view(request):
    logout(request)
    messages.info(request, "You have been logged out.")
    return redirect('home')
                