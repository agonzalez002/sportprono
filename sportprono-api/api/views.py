from django.shortcuts import render
from .models import Group
from rest_framework import viewsets
from .serializers import GroupSerializer


class GroupViewset(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
