from api import views
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from django.conf.urls import include
from django.urls import re_path


router = routers.DefaultRouter()
router.register(r'groups', views.GroupViewset)
router.register(r'events', views.EventViewset)
router.register(r'bets', views.BetViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'profile', views.UserProfileViewset)
router.register(r'members', views.MemberViewSet)

urlpatterns = [
    re_path('^', include(router.urls)),
    re_path('login', views.CustomObtainAuthToken.as_view()),
]

