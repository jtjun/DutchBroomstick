from django.http import Http404
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import permissions
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from .models import Room, Member, Layer, Payment, Credit
from .serializers import UserSerializer, RoomSerializer, MemberSerializer, \
                            LayerSerializer, PaymentSerializer, CreditSerializer
from .permissions import IsThemselves, CheckUsername


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetailView(generics.RetrieveAPIView):
    permission_classes = (IsThemselves,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'


class RoomListCreateView(generics.ListCreateAPIView):
    permission_classes = (CheckUsername,)
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class RoomDetailView(generics.RetrieveAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    lookup_field = 'url'


class MemberListCreateView(generics.ListCreateAPIView):
    serializer_class = MemberSerializer

    def get_room(self):
        try:
            room_url = self.request.resolver_match.kwargs.get('url')
            return Room.objects.get(url=room_url)
        except Room.DoesNotExist:
            raise Http404

    def get_queryset(self):
        return self.get_room().member_set
    
    def perform_create(self, serializer):
        data = self.request.data
        room = self.get_room()
        
        if room.member_set.filter(membername=data.get("membername")).exists():
            raise ValidationError({ 'nickname': ["중복된 별명입니다."] })
        
        user = None
        if 'user' in data.keys():
            try:
                user = User.objects.get(username=data['user'])
            except User.DoesNotExist:
                raise ValidationError({ 'user': ["등록되지 않은 사용자명입니다."] })
            
            if room.member_set.filter(user=user).exists():
                raise ValidationError({ 'user': ["이미 해당 방에 속한 사용자입니다."] })

        serializer.save(room=room, user=user)


class MemberDetailView(generics.RetrieveAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    lookup_field = 'membername'


class LayerCreateView(generics.CreateAPIView):
    queryset = Layer.objects.all()
    serializer_class = LayerSerializer


class LayerDetailView(generics.RetrieveAPIView):
    queryset = Layer.objects.all()
    serializer_class = LayerSerializer
    lookup_field = 'number'


class PaymentCreateView(generics.CreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class PaymentDetailView(generics.RetrieveAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    lookup_field = "id"


class CreditCreateView(generics.CreateAPIView):
    queryset = Credit.objects.all()
    serializer_class = CreditSerializer


class CreditDetailView(generics.RetrieveAPIView):
    queryset = Credit.objects.all()
    serializer_class = CreditSerializer
    lookup_field = "id"
