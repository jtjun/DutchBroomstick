from django.contrib.auth.models import User
from .permissions import IsThemselves
from rest_framework import generics
from rest_framework import permissions

from .models import Room, Member, Layer, Payment, Credit
from .serializers import UserSerializer, RoomSerializer, MemberSerializer, \
                            LayerSerializer, PaymentSerializer, CreditSerializer


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
    lookup_field = 'membername'


class LayerCreateView(generics.CreateAPIView):
    queryset = Layer.objects.all()
    serializer_class = LayerSerializer


class LayerDetailView(generics.RetrieveAPIView):
    queryset = Layer.objects.all()
    serializer_class = LayerSerializer
    lookup_field = 'layername'


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
