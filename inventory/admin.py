from django.contrib import admin
from .models import Category, Supplier, Product, StockTransaction

# Register your models here.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ('name', 'contact_person', 'phone', 'email')
    search_fields = ('name', 'contact_person')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('part_number', 'name', 'category', 'supplier', 'quantity', 'minimum_stock', 'unit_price', 'warehouse_location', 'stock_status')
    search_fields = ('part_number', 'name')
    list_filter = ('category', 'supplier')

@admin.register(StockTransaction)
class StockTransactionAdmin(admin.ModelAdmin):
    list_display = ('product', 'transaction_type', 'quantity', 'transaction_date')
    search_fields = ('product__name',)
    list_filter = ('transaction_type', 'transaction_date')
