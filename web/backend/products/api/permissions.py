from rest_framework import permissions


class IsProductOwnerOrReadOnly(permissions.BasePermission):
    """
    A custom permission class which control
    if the requested user is product owner or not
    for PUT and DELETE methodes
    """

    def has_object_permission(self, request, view, obj):
        # SAFE_METHODS are: GET, OPTIONS, HEAD
        if request.method in permissions.SAFE_METHODS:
            return True
        # Otherwise, only the product owner can change the product
        return obj.user == request.user
