from django.conf.urls import include
from django.urls import re_path
from rest_framework import routers

from .views import (BetViewSet, CustomObtainAuthToken, EventViewset,
                    GroupViewset, MemberViewSet, UserProfileViewset,
                    UserViewSet)

router = routers.DefaultRouter()
router.register(r"groups", GroupViewset)
router.register(r"events", EventViewset)
router.register(r"bets", BetViewSet)
router.register(r"users", UserViewSet)
router.register(r"profile", UserProfileViewset)
router.register(r"members", MemberViewSet)

urlpatterns = [
    re_path("^", include(router.urls)),
    re_path("login", CustomObtainAuthToken.as_view()),
]
