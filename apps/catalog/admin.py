from django.contrib import admin
from apps.catalog.models import Category,Product,CartItem,Order

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(CartItem)
admin.site.register(Order)

