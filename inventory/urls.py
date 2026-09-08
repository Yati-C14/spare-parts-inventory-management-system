from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import (CategoryViewSet, SupplierViewSet, ProductViewSet, StockTransactionViewSet, dashboard)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'suppliers', SupplierViewSet)
router.register(r'products', ProductViewSet)
router.register(r'stock-transactions', StockTransactionViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/', dashboard, name='dashboard'),
]