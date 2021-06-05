from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.authentication import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import PasswordSerializer, UserSerializer


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


class UserRegister(APIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, format='json'):

        first_name, last_name, username, email, password = request.data.values()
        user = User.objects.create(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=make_password(password)
        )

        serializer = UserSerializer(user)

        return Response(serializer.data)


class UserLoginView(APIView):
    def post(self, request, format='json'):
        username, password = request.data.values()

        user = authenticate(request, username=username, password=password)
        if user:
            # Delete exitsting token
            token = Token.objects.filter(user=user)
            if token:
                token.delete()
            # Serialize user and create token if it doesn't have
            serializer = UserSerializer(user)
            return Response(serializer.data)
        return Response(data={'detail': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


class ResetPassword(generics.UpdateAPIView):
    """
       An endpoint for changing password.
    """
    model = User
    serializer_class = PasswordSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        obj = Token.objects.get(key=self.request.auth.key).user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):

                return Response(data={'detail': 'Wrong password'}, status=status.HTTP_400_BAD_REQUEST)

            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()

            return Response({'detail': 'Password updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
