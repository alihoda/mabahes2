from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from .serializers import UserSerializer


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAdminUser, )


class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    An endpoint to retrieve and update user profile
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """
        Get user object based on given token not pk
        """
        obj = Token.objects.get(key=self.request.auth.key).user
        return obj

    def update(self, request, *args, **kwargs):
        # Get user object
        obj = self.get_object()
        # Make QueryDic mutable
        data = request.data.copy()
        # Add first_name key to data
        data['first_name'] = data['name']
        # Update user object
        user, created = User.objects.update_or_create(
            id=obj.id,
            defaults=data
        )
        # Serialize the updated user
        serializer = self.get_serializer(user, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
