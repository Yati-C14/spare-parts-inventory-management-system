from rest_framework import viewsets,status
from rest_framework.decorators import api_view,action
from rest_framework.response import Response
from .models import Category, Supplier, Product, StockTransaction
from .serializers import (CategorySerializer, SupplierSerializer, ProductSerializer, StockTransactionSerializer)

# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    @action(detail=True, methods=['post'],url_path='stock_in')
    def stock_in(self, request, pk=None):
        product = self.get_object()
        try:
            quantity = int(request.data.get('quantity', 0))
        except (TypeError, ValueError):
            return Response({'error': 'Invalid quantity'}, status=status.HTTP_400_BAD_REQUEST)
        if quantity <= 0:
            return Response({'error': 'Quantity must be greater than zero'}, status=status.HTTP_400_BAD_REQUEST)
        previous_quantity = product.quantity
        product.quantity += quantity
        product.save()
        transaction = StockTransaction.objects.create(product=product, quantity=quantity, transaction_type='IN')
        
        return Response({'message': 'Stock added successfully',"product_id": ProductSerializer(product).data, 'transaction': StockTransactionSerializer(transaction).data}, status=status.HTTP_200_OK)
    @action(detail=True, methods=['post'],url_path='stock_out')
    def stock_out(self, request, pk=None):
        product = self.get_object()
        try:
            quantity = int(request.data.get('quantity', 0))
        except (TypeError, ValueError):
            return Response({'error': 'Invalid quantity'}, status=status.HTTP_400_BAD_REQUEST)
        if quantity <= 0:
            return Response({'error': 'Quantity must be greater than zero'}, status=status.HTTP_400_BAD_REQUEST)
        if product.quantity < quantity:
            return Response({'error': 'Insufficient stock',"available_stock": product.quantity}, status=status.HTTP_400_BAD_REQUEST)
    
        product.quantity -= quantity
        product.save()
        transaction = StockTransaction.objects.create(product=product, quantity=quantity, transaction_type='OUT')
        return Response({'message': 'Stock removed successfully',"product_id": ProductSerializer(product).data, 'transaction': StockTransactionSerializer(transaction).data}, status=status.HTTP_200_OK)
    
class StockTransactionViewSet(viewsets.ModelViewSet):
    queryset = StockTransaction.objects.all()
    serializer_class = StockTransactionSerializer
@api_view(['GET'])
def dashboard(request):
    products = Product.objects.all()
    total_products = products.count()
    total_stock = sum(product.quantity for product in products)
    low_stock_products = sum(1 for product in products if product.quantity > 0 and product.quantity <= product.minimum_stock)
    out_of_stock_products = sum(1 for product in products if product.quantity == 0)
    return Response({
        'total_products': total_products,
        'total_stock': total_stock,
        'low_stock_products': low_stock_products,
        'out_of_stock_products': out_of_stock_products,
    })
