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
         views.RoomListCreateView.as_view()),
    path('rooms/<str:url>/', views.RoomDetailView.as_view()),

    # member urls
    path('rooms/<str:url>/members/', views.MemberListCreateView.as_view()),
    path('users/<str:username>/rooms/<str:roomname>/members/<str:membername>',
         views.MemberDetailView.as_view()),

    # layer urls
    path('users/<str:username>/rooms/<str:roomname>/layers',
         views.LayerCreateView.as_view()),
    path('users/<str:username>/rooms/<str:roomname>/layers/<str:number>',
         views.LayerDetailView.as_view()),

    # payment urls
    path('users/<str:username>/rooms/<str:roomname>/layers/<str:number>/payments',
         views.PaymentCreateView.as_view()),
    path('users/<str:username>/rooms/<str:roomname>/layers/<str:number>/payments/<str:id>',
         views.PaymentDetailView.as_view()),

    # credit urls
    path('users/<str:username>/rooms/<str:roomname>/layers/<str:number>/payments/<str:id>/credits',
         views.CreditCreateView.as_view()),
    # path('users/<str:username>/rooms/<str:roomname>/layers/<str:number>/payments/<str:id>/credits/<str:id>',
    #      views.CreditDetailView.as_view()),
]
