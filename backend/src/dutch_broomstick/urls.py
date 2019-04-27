from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    path('users/', views.UserCreateView.as_view()),
    path('users/<str:username>/', views.UserDetailView.as_view()),
    path('users/token/', obtain_auth_token),
]