from django.shortcuts import render,get_object_or_404,redirect
from apps.catalog.models import Category,Product,CartItem,Order
from decimal import Decimal


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

    total = sum(item.get_total_price() for item in cart_items)

    order = Order.objects.create(user=request.user, total_price=Decimal(total))
    order.items.set(cart_items)  

    cart_items.delete()  

    return redirect('order_confirmation', order_id=order.pk)

def order_confirmation(request, order_id):
    order = get_object_or_404(Order, id=order_id, user=request.user)
    return render(request, 'order.html', {'order': order})
