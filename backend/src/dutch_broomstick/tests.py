import json

from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from dutch_broomstick.models import Room, Member, Layer, Payment, Credit
from dutch_broomstick.serializers import PaymentSerializer


class TokenAuth:
    def __init__(self, client, token):
        self.client = client
        self.token = token

    def __enter__(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token}")
        return self.client
    
    def __exit__(self, type, value, traceback):
        self.client.credentials()


# Create your tests here.
class UserTestCase(APITestCase):
    def create_user(self, username, password, *, default_nickname=None, default_account=None):
        payload = {'username': username, 'password': password}
        if default_nickname:
            payload.update(default_nickname=default_nickname)
        if default_account:
            payload.update(default_account=default_account)
        return self.client.post('/api/users/', payload, format='json')
    
    def get_token(self, username, password):
        return self.client.post(
            '/api/token/',
            {'username': username, 'password': password},
            format='json'
        )

    def test_create_user(self):
        response = self.create_user('test1', 'test!@#$')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            json.loads(response.content),
            {'id': 1, 'username': 'test1', 'default_nickname': '', 'default_account': ''}
        )

        # default_nickname test
        response = self.create_user('test2', 'test!@#$', default_nickname='nick')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            json.loads(response.content),
            {'id': 2, 'username': 'test2', 'default_nickname': 'nick', 'default_account': ''}
        )

        # default_account test
        response = self.create_user('test3', 'test!@#$', default_nickname='nick', default_account='toss')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            json.loads(response.content),
            {'id': 3, 'username': 'test3', 'default_nickname': 'nick', 'default_account': 'toss'}
        )

        # Duplicate ID
        response = self.create_user('test1', 'test!@#$')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_token(self):
        response = self.create_user('test1', 'test!@#$')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.get_token('test1', 'wrong')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.get_token('test1', 'test!@#$')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsNotNone(json.loads(response.content).get('token'))
    
    def test_get_user(self):
        payload = {'username': 'test1', 'password': 'test!@#$'}
        username = payload['username']

        response = self.create_user(**payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # without token
        response = self.client.get(f"/api/users/{username}/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # valid token
        response = self.get_token(**payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        token = json.loads(response.content).get('token')
        self.assertIsNotNone(token)

        with TokenAuth(self.client, token) as client:
            response = self.client.get(f"/api/users/{username}/")
            self.assertEqual(response.status_code, status.HTTP_200_OK)

        # another user's token
        response = self.create_user('test2', 'test!@#$')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.get_token('test2', 'test!@#$')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        another_token = json.loads(response.content).get('token')
        self.assertIsNotNone(another_token)

        with TokenAuth(self.client, another_token) as client:
            response = client.get(f"/api/users/{username}/")
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class AuthentificatedTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='test', password='test!@#$')
        self.client.force_authenticate(user=self.user)
    
    def tearDown(self):
        self.client.force_authenticate(user=None)
        self.user.delete()
        self.user = None
    
    def create_room(self, roomname):
        response = self.client.post(
            f"/api/users/{self.user.username}/rooms/",
            { 'roomname': roomname }, format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return json.loads(response.content)
    
    def test_create_room(self):
        # Room 생성 요청
        room_url = self.create_room("test room").get('url')

        # Layer도 같이 생성되는가?
        room = Room.objects.get(url=room_url)
        layers = Layer.objects.filter(room=room)
        
        self.assertEqual(layers.count(), 1)  # Layer가 1개만 생성되는가?
        self.assertEqual(layers.first().number, 0)  # 해당 Layer는 0번인가?
    
    def test_create_payment(self):
        room_json = self.create_room("test room")
        room = Room.objects.get(url=room_json['url'])

        Member.objects.create(room=room, membername='test1')
        Member.objects.create(room=room, membername='test2')

        # Payment 생성 요청
        response = self.client.post(
            f"/api/rooms/{room_json.get('url')}/layers/0/payments/",
            {
                'fromWho': 'test1',
                'forWhat': "고깃집",
                'total': 2000.0,
                'credits': [
                    { 'toWho': 'test1', 'amount': 1000.0 },
                    { 'toWho': 'test2', 'amount': 1000.0 }
                ]
            }, format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # timestamp, layer, credits
        payment = json.loads(response.content)
        self.assertIsNotNone(payment.get('id'))
        self.assertIsNotNone(payment.get('timestamp'))

        credit_list = payment.get('credits')
        self.assertEqual(len(credit_list), 2)
        
        amount = 0
        for credit in credit_list:
            amount += credit.get('amount')
        
        self.assertEqual(amount, payment.get('total'))


class SerializerTest(TestCase):
    def test_payment_serializer(self):
        owner = User.objects.create(username="test_user", password="password")
        room = Room.objects.create(roomname="test room", owner=owner)
        layer = Layer.objects.create(number=0, room=room)
        
        member_list = [
            Member.objects.create(membername=name, room=room)
            for name in ["A", "B", "C"]
        ]

        payment = Payment.objects.create(total=300.0, layer=layer, forWhat="test", fromWho=member_list[0])
        credit_list = [
            Credit.objects.create(amount=100.0, payment=payment, toWho=member)
            for member in member_list
        ]

        serialized = PaymentSerializer(payment).data

        self.assertTrue('id' in serialized.keys())
        self.assertTrue('timestamp' in serialized.keys())
        self.assertEqual(serialized.get('fromWho'), "A")
        self.assertEqual(serialized.get('forWhat'), "test")
        self.assertEqual(serialized.get('layer'), 0)
        self.assertEqual(str(serialized.get('total')), str(payment.total))

        for i, credit in enumerate(credit_list):
            credit_dict = serialized['credits'][i]
            self.assertEqual(credit_dict.get('toWho'), credit.toWho.membername)
            self.assertEqual(str(credit_dict.get('amount')), str(credit.amount))

