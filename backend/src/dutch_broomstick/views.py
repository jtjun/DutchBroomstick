from django.contrib.auth.models import User
from .models import Room, Member
from rest_framework import generics
from rest_framework import permissions
from rest_framework.response import Response

from .serializers import UserSerializer, RoomSerializer, MemberSerializer
from .permissions import IsThemselves, CheckUsername


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetailView(generics.RetrieveAPIView):
    permission_classes = (IsThemselves,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'


class RoomCreateView(generics.CreateAPIView):
    permission_classes = (CheckUsername,)
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class RoomDetailView(generics.RetrieveAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    lookup_field = 'roomname'


class MemberCreateView(generics.CreateAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer


class MemberDetailView(generics.RetrieveAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    lookup_field = 'name'
