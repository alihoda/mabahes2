from rest_framework import serializers
from django.utils.timesince import timesince

from .models import Product, Tag


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ['id', 'name']


class ProductSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    createdAt = serializers.SerializerMethodField(read_only=True)
    tags = TagSerializer(read_only=True, many=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'user', 'description',
                  'image', 'tags', 'createdAt']

    def get_createdAt(self, obj):
        return timesince(obj.created_at)
