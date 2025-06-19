from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug= models.SlugField(max_length=100, unique=True)
    description=models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    

class Product(models.Model):
    name = models.CharField(max_length=100)
    description= models.TextField(blank=True, null=True)
    slug= models.SlugField(max_length=100, unique=True)
    price = models.DecimalField(max_length=10, decimal_places=2, max_digits=10)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    category = models.ForeignKey(Category, related_name='products',on_delete=models.CASCADE)
    is_featured = models.BooleanField(default=False)


class CartItem(models.Model):
    product = models.ForeignKey(Product, related_name='cart_items', on_delete = models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

class Cart(models.Model):
    items = models.ManyToManyField(CartItem, related_name='carts', blank=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def update_total_price(self):
        self.total_price = sum(item.product.price * item.quantity for item in self.items.all())
        self.save()

class Order(models.Model):
    cart = models.ForeignKey(Cart, related_name='orders', on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='Pending')
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def save(self, *args, **kwargs):
        self.total_price = self.cart.total_price
        super().save(*args, **kwargs)

class OrderItem(models.Model):  
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='order_items', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        self.price = self.product.price * self.quantity
        super().save(*args, **kwargs)