import random
import string
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    default_nickname = models.CharField(max_length=30, blank=True)
    default_account = models.TextField(blank=True)


def random_url(length=7):
    # 중복 없는 무작위 length(7)개 알파벳 생성 후 반환
    while True:
        url = "".join([random.choice(string.ascii_lowercase) for _ in range(length)])
        try:
            Room.objects.get(url=url)
        except Room.DoesNotExist:
            return url


class Room(models.Model):
    roomname = models.CharField(max_length=30, blank=False) # Room's name
    # Room's owner is always registered user
    url = models.CharField(max_length=10, default=random_url, unique=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    # ForeignKey can handle OneToMany

    def __str__(self):
        return self.url


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
    # total money
    total = models.FloatField()
    layer = models.ForeignKey(Layer, on_delete=models.CASCADE, null=False)
    # what paid for
    forWhat = models.CharField(max_length=30, blank=False)
    # who paid the <forWhat>
    fromWho = models.ForeignKey(Member, on_delete=models.CASCADE, null=False)


class Credit(models.Model):
    # amount of money
    amount = models.FloatField()
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, null=False)
    # who send the money to payment.fromWho
    toWho = models.ForeignKey(Member, on_delete=models.CASCADE, null=False)
