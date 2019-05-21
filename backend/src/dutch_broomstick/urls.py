from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    path('users/', views.UserCreateView.as_view()),
    path('users/<str:username>/', views.UserDetailView.as_view()),
    path('token/', obtain_auth_token),

    path('users/<str:username>/rooms/', views.RoomCreateView.as_view()),
    path('users/<str:username>/rooms/<str:roomname>/', views.RoomDetailView.as_view()),

    path('users/<str:username>/rooms/<str:roomname>/members/', views.MemberCreateView.as_view()),
    path('users/<str:username>/rooms/<str:roomname>/members/<str:name>', views.MemberDetailView.as_view()),
]
