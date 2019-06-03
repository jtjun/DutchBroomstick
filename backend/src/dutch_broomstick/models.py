from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    default_nickname = models.CharField(max_length=30, blank=True)
    default_account = models.TextField(blank=True)

class Room(models.Model):
    #url =
    roomname = models.CharField(max_length=30, blank=False) # Room's name
    # Room's owner is always registered user
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    # ForeignKey can handle OneToMany

class Member(models.Model):
    membername = models.CharField(max_length=30, blank=False)
    account = models.CharField(max_length=30, blank=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True) # user is nullable


class Layer(models.Model):
    number = models.IntegerField()
    layername = models.CharField(max_length=30, blank=True)
    currency = models.CharField(max_length=30, blank=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, null=False)


class Payment(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    layer = models.ForeignKey(Layer, on_delete=models.CASCADE, null=False)
    # what paid for
    forWhat = models.CharField(max_length=30, blank=False)
    # who paid the <forWhat>
    fromWho = models.ForeignKey(Member, on_delete=models.CASCADE, null=False)


class Credit(models.Model):
    amount = models.FloatField()
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, null=False)
    # who send the money to payment.fromWho
    toWho = models.ForeignKey(Member, on_delete=models.CASCADE, null=False)
