from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.authtoken.models import Token

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    username = serializers.CharField(max_length=20)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'username', 'email', 'isAdmin', 'token']

    def get_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'

    def get_username(self, obj):
        return obj.username

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_token(self, obj):
        token, created = Token.objects.get_or_create(user=obj)
        return token.key


class PasswordSerializer(serializers.Serializer):
    model = User

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
