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

    def update(self, **kwargs):
        try:
            profile_data = self.validated_data.pop('profile')
        except KeyError:
            profile_data = {}
            
        instance = super.save(**kwargs)
        Profile.objects.update_or_create(user=instance, **profile_data)
        return instance


class RoomSerializer(serializers.ModelSerializer):
    roomname = serializers.CharField()
    owner = serializers.StringRelatedField()
    url = serializers.ReadOnlyField()

    class Meta:
        model = Room
        fields = ('roomname', 'owner', 'url')
    
    def create(self, validated_data):
        room = Room(**validated_data)
        room.save()

        Layer.objects.create(number=0, room=room)
        return room


class MemberSerializer(serializers.ModelSerializer):
    membername = serializers.CharField()
    account = serializers.CharField(allow_blank=True)
    room = serializers.StringRelatedField()
    user = serializers.ReadOnlyField(source="user.id")

    class Meta:
        model = Member
        fields = ('id', 'membername', 'account', 'room', 'user')

class LayerSerializer(serializers.ModelSerializer):
    number = serializers.IntegerField()
    layername = serializers.CharField()
    currency = serializers.CharField()
    room = serializers.ReadOnlyField(source="room.id")

    class Meta:
        model = Layer
        fields = ('number', 'layername', 'currency', 'room')


class CreditSerializer(serializers.ModelSerializer):
    amount = serializers.FloatField()
    payment = serializers.ReadOnlyField(source="fromWho.id")
    toWho = serializers.StringRelatedField()

    class Meta:
        model = Credit
        fields = ('id', 'payment', 'amount', 'toWho')


class PaymentSerializer(serializers.ModelSerializer):
    total = serializers.FloatField()
    layer = serializers.ReadOnlyField(source="layer.number")
    forWhat = serializers.CharField()
    fromWho = serializers.StringRelatedField()
    credits = CreditSerializer(many=True, source="credit_set", read_only=True)

    class Meta:
        model = Payment
        fields = ('id', 'total', 'timestamp', 'layer', 'forWhat', 'fromWho', 'credits')
