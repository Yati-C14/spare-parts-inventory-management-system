from rest_framework import serializers
from .models import Category, Supplier, Product, StockTransaction

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'
class ProductSerializer(serializers.ModelSerializer):
    stock_status = serializers.ReadOnlyField()
    class Meta:
        model = Product
        fields = ["id","part_number", "name", "description", "category", "supplier", "quantity", "minimum_stock", "unit_price", "warehouse_location", "created_at", "updated_at", "stock_status"]
class StockTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockTransaction
        fields = '__all__'