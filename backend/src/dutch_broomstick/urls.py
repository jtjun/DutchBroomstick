from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    # user urls
    path('users/', views.UserCreateView.as_view()),
    path('users/<str:username>/', views.UserDetailView.as_view()),
    path('token/', obtain_auth_token),

    # room urls
    path('users/<str:username>/rooms/',
         views.RoomCreateView.as_view()),
    path('users/<str:username>/rooms/<str:roomname>/',
         views.RoomDetailView.as_view()),

    # member urls
    path('users/<str:username>/rooms/<str:roomname>/members/',
         views.MemberCreateView.as_view()),
    path('users/<str:username>/rooms/<str:roomname>/members/<str:membername>',
         views.MemberDetailView.as_view()),

    # layer urls
    path('users/<str:username>/rooms/<str:roomname>/layers',
         views.LayerCreateView.as_view()),
    path('users/<str:username>/rooms/<str:roomname>/layers/<str:layername>',
         views.LayerDetailView.as_view()),

    # payment urls
    path('users/<str:username>/rooms/<str:roomname>/layers/<str:layername>/payments',
         views.PaymentCreateView.as_view()),
    path('users/<str:username>/rooms/<str:roomname>/layers/<str:layername>/payments/<str:id>',
         views.PaymentDetailView.as_view()),

    # credit urls
    path('users/<str:username>/rooms/<str:roomname>/layers/<str:layername>/payments/<str:id>/credits',
         views.CreditCreateView.as_view()),
    path('users/<str:username>/rooms/<str:roomname>/layers/<str:layername>/payments/<str:id>/credits/<str:id>',
         views.CreditDetailView.as_view()),
]
