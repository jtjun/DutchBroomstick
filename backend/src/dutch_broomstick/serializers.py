from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile

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

        user = User.objects.create(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user
