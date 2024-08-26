from api import views
from rest_framework import routers

from django.conf.urls import include
from django.urls import re_path


router = routers.DefaultRouter()
router.register(r'groups', views.GroupViewset)

urlpatterns = [
    re_path('^', include(router.urls)),
]

