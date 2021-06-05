from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),

    # users path
    path('api/users/', include('users.urls')),
]
