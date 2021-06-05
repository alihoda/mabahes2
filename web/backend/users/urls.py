from django.urls import path

from . import views

app_name = 'users'

urlpatterns = [
    path('', views.UserListView.as_view(), name='user_list'),
    path('profile/', views.UserProfileView.as_view(), name='user_profile'),
    # auth path
    path('register/', views.UserRegister.as_view(), name='user_register'),
    path('login/', views.UserLoginView.as_view(), name='user_login'),
    path('reset-password/', views.ResetPassword.as_view(), name='update_password'),
]
