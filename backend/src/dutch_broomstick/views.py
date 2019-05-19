from django.contrib.auth.models import User
from .models import Room, Member
from rest_framework import generics
from rest_framework import permissions

from .serializers import UserSerializer, RoomSerializer, MemberSerializer
from .permissions import IsThemselves


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetailView(generics.RetrieveAPIView):
    permission_classes = (IsThemselves,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'


class RoomCreateView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


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
