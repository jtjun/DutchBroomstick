from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    default_nickname = models.CharField(max_length=30, blank=True)
    default_account = models.TextField(blank=True)

class Room(models.Model):
    roomname = models.CharField(max_length=30, blank=False) # Room's name
    # Room's owner is always registered user
    owner = models.OneToManyField(User, on_delete=models.CASCADE, null=False)

class Member(models.Model):
    name = models.CharField(max_length=30, blank=False)
    account = models.CharField(blank=True)
    room = models.OneToManyField(Room, on_delete=models.CASCADE, null=False)
    user = models.OneToManyField(User, on_delete=models.CASCADE, null=True) # user is nullable

