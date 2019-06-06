import json

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase


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
