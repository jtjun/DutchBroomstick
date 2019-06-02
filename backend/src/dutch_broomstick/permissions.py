from rest_framework import permissions


class IsThemselves(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj == request.user


class CheckUsername(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.resolver_match.kwargs.get('username') == request.user.username
