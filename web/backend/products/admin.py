from django.contrib import admin

from . import models


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'created_at', 'updated_at')
    list_filter = ('name', 'created_at', 'updated_at')
    search_fields = ('name__in',)

    def user(self, obj):
        return obj.user.username


admin.site.register(models.Product, ProductAdmin)
admin.site.register(models.Tag)
