from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import permissions

from .serializers import UserSerializer
from .permissions import IsThemselves


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetailView(generics.RetrieveAPIView):
    permission_classes = (IsThemselves,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'
