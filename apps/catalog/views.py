from django.shortcuts import render,get_object_or_404,redirect
from django.urls import reverse
from apps.catalog.models import Category,Product,CartItem,Order,Brand
from decimal import Decimal

def brand_list(request):
    brands = Brand.objects.all()
    return render(request, 'brand_list.html', {'brands': brands})

def brand_detail(request, slug):
    brand = get_object_or_404(Brand, slug=slug)
    return render(request, 'brand_detail.html', {'brand': brand})


def category_list(request):
    categories = Category.objects.all()
    return render(request,'category_list.html', context= { 'categories': categories })

def category_detail(request,slug):
    search = request.GET.get('search', '')
    if search:
        products= Product.objects.filter(name__icontains=search)
    else:
        products= Product.objects.all()
    
    
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


def cart_view(request):
    cart_items = CartItem.objects.filter(user=request.user)
    cart_total = sum(item.get_total_price() for item in cart_items)
    return render(request, 'cart.html', {
        'cart_items': cart_items,
        'cart_total': cart_total,
    })


def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    cart_item, created = CartItem.objects.get_or_create(user=request.user, product=product)
    if not created:
        cart_item.quantity += 1
    cart_item.save()
    return redirect('cart_view')


def remove_from_cart(request, product_id):
    cart_item = get_object_or_404(CartItem, user=request.user, product_id=product_id)
    cart_item.delete()
    return redirect('cart_view')




def checkout(request):
    cart_items = CartItem.objects.filter(user=request.user)

    if not cart_items.exists():
        return redirect('cart_view') 

    if request.method == 'POST':
        full_name = request.POST.get('name')
        address = request.POST.get('address')
        payment_method = request.POST.get('payment_method')

        total = sum(item.get_total_price() for item in cart_items)

        order = Order.objects.create(
            user=request.user,
            total_price=Decimal(total),
            full_name=full_name,
            address=address,
            payment_method=payment_method,
            is_paid=True,
            order_status='shipped'
        )
        if payment_method == 'credit_card':
            card_holder = request.POST.get('card_holder_name')
            card_number = request.POST.get('card_number')
            card_expiration = request.POST.get('card_expiry')

            masked = "**** **** **** " + card_number[-4:]

            order.card_holder_name = card_holder
            order.masked_card_number = masked
            order.card_expiration = card_expiration

        order.items.set(cart_items)
        cart_items.delete()  
        
        return redirect('order_confirmation',order_id=order.id)

    return render(request, 'checkout.html')


def order_confirmation(request, order_id):
    order = get_object_or_404(Order, id=order_id, user=request.user)
    return render(request, 'order.html', {'order': order})


def orders(request):
    user_orders = Order.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'orders.html', {'orders': user_orders})

