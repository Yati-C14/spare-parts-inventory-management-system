from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100,unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Supplier(models.Model):
    name = models.CharField(max_length=150)
    contact_person = models.CharField(max_length=100,blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20,blank=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    part_number = models.CharField(max_length=50,unique=True)
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    category = models.ForeignKey(Category,on_delete=models.PROTECT,related_name='products')
    supplier = models.ForeignKey(Supplier,on_delete=models.SET_NULL,related_name='products',null=True,blank=True)
    quantity = models.PositiveIntegerField(default=0)
    minimum_stock = models.PositiveIntegerField(default=10)
    unit_price = models.DecimalField(max_digits=10,decimal_places=2)
    warehouse_location = models.CharField(max_length=100,default='Main Warehouse')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.part_number})"
    @property
    def stock_status(self):
        if self.quantity == 0:
            return "Out of Stock!"
        elif self.quantity <= self.minimum_stock:
            return "Low Stock!"
        else:
            return "In Stock."

class StockTransaction(models.Model):
    TRANSACTION_TYPES = (
        ('IN', 'Stock In'),
        ('OUT', 'Stock Out'),
    )
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name='transactions')
    transaction_type = models.CharField(max_length=3,choices=TRANSACTION_TYPES)
    quantity = models.PositiveIntegerField()
    transaction_date = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.product.name} - {self.transaction_type})"