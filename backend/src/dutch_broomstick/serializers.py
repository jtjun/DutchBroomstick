from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile, Room,  Member, Layer, Payment, Credit

class UserSerializer(serializers.ModelSerializer):
    default_nickname = serializers.CharField(source='profile.default_nickname', required=False)
    default_account = serializers.CharField(source='profile.default_account', required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'default_nickname', 'default_account')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        try:
            profile_data = validated_data.pop('profile')
        except KeyError:
            profile_data = {}

        user = User(**validated_data)
        user.set_password(validated_data.get('password'))
        user.save()

        Profile.objects.create(user=user, **profile_data)
        return user


class RoomSerializer(serializers.ModelSerializer):
    roomname = serializers.CharField()
    owner = serializers.StringRelatedField()
    url = serializers.ReadOnlyField()

    class Meta:
        model = Room
        fields = ('roomname', 'owner', 'url')


class MemberSerializer(serializers.ModelSerializer):
    membername = serializers.CharField(source="membername")
    account = serializers.CharField(source="account")
    room = serializers.ReadOnlyField(source="room.id")
    user = serializers.ReadOnlyField(source="user.id")

    class Meta:
        model = Member
        fields = ('id', 'membername', 'account', 'room', 'user')

class LayerSerializer(serializers.ModelSerializer):
    number = serializers.IntegerField(source="number")
    layername = serializers.CharField(source="layename")
    currency = serializers.CharField(source="currency")
    room = serializers.ReadOnlyField(source="room.id")

    class Meta:
        model = Layer
        fields = ('number', 'layername', 'currency', 'room')


class PaymentSerializer(serializers.ModelSerializer):
    total = serializers.FloatField(source="total")
    layer = serializers.ReadOnlyField(source="layer.id")
    forWhat = serializers.CharField(source="forWhat")
    fromWho = serializers.ReadOnlyField(source="fromWho.id")

    class Meta:
        model = Payment
        fields = ('id', 'total', 'timestamp', 'layer', 'forWhat', 'fromWho')


class CreditSerializer(serializers.ModelSerializer):
    amount = serializers.FloatField(source="amount")
    payment = serializers.ReadOnlyField(source="fromWho.id")
    toWho = serializers.ReadOnlyField(source="fromWho.id")

    class Meta:
        model = Credit
        fields = ('id', 'amount', 'payment', 'towho')
