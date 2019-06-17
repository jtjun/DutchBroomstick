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


class UserDetailView(generics.RetrieveUpdateAPIView):
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


class RoomDetailView(generics.RetrieveDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    lookup_field = 'url'


class RoomMixin:
    def get_room(self):
        try:
            room_url = self.request.resolver_match.kwargs.get('url')
            return Room.objects.get(url=room_url)
        except Room.DoesNotExist:
            raise Http404


class MemberListCreateView(RoomMixin, generics.ListCreateAPIView):
    serializer_class = MemberSerializer

    def get_queryset(self):
        return self.get_room().member_set

    def perform_create(self, serializer):
        data = self.request.data
        room = self.get_room()

        if room.member_set.filter(membername=data.get("membername")).exists():
            raise ValidationError({'nickname': ["중복된 별명입니다."]})

        user = None
        if 'user' in data.keys():
            try:
                user = User.objects.get(username=data['user'])
            except User.DoesNotExist:
                raise ValidationError({'user': ["등록되지 않은 사용자명입니다."]})

            if room.member_set.filter(user=user).exists():
                raise ValidationError({'user': ["이미 해당 방에 속한 사용자입니다."]})

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


class PaymentCreateView(RoomMixin, generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

    def get_queryset(self):
        kwargs = self.request.resolver_match.kwargs

        room = self.get_room()
        layer = room.layer_set.get(number=kwargs['number'])
        
        return Payment.objects.filter(layer=layer)

    def get_member(self, membername, room=None):
        if room is None:
            room = self.get_room()

        try:
            return Member.objects.get(room=room, membername=membername)
        except Member.DoesNotExist:
            raise Http404

    def perform_create(self, serializer):
        kwargs = self.request.resolver_match.kwargs
        data = self.request.data

        room = self.get_room()
        layer = room.layer_set.get(number=kwargs['number'])

        fromWho = self.get_member(data['fromWho'], room=room)
        payment = serializer.save(layer=layer, fromWho=fromWho)

        for credit in data['credits']:
            Credit.objects.create(
                payment=payment,
                toWho=self.get_member(credit['toWho'], room=room),
                amount=credit['amount']
            )


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
