from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile, Member, Room

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
    roomname = serializers.CharField(source="roomname")
    owner = serializers.ReadOnlyField(source="user.pk")

    class Meta:
        model = Room
        fields = ('roomname', 'owner')


class MemberSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="name")
    account = serializers.CharField(source="account")
    room = serializers.ReadOnlyField(source="room.pk")
    user = serializers.ReadOnlyField(source="user.pk")

    class Meta:
        model = Member
        fields = ('name', 'account', 'room', 'user')
