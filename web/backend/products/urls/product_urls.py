from django.urls import path

from products.views import product_views as views


urlpatterns = [
    path('', views.ProductListView.as_view(), name='product_list_create'),
    path('<int:pk>/', views.ProductView.as_view(), name='product_detail'),
]
