from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from products.api.permissions import IsProductOwnerOrReadOnly
from products.api.serializers import ProductSerializer
from products.models import Product, Tag


class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def create(self, request, *args, **kwargs):

        # Retrive user based on given token
        user = request.user
        # Create product
        product = Product.objects.create(
            user=user,
            name=request.data['name'],
            description=request.data['description'],
            image=request.data['image']
        )
        # Create Tags
        for tag in request.data.getlist('tags'):
            # Convert tag name to lowercase
            tag_name = str.lower(tag)
            # Get or create tag
            obj, created = Tag.objects.get_or_create(
                name=tag_name, defaults={'name': tag_name})
            # Assign tag to the product
            product.tags.add(obj)

        # Serializer product
        serializer = self.get_serializer(product)

        return Response(serializer.data)


class ProductView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsProductOwnerOrReadOnly)
