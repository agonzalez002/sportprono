from django.shortcuts import render
from .models import Group, Event
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import GroupSerializer, EventSerializer, GroupFullSerializer


class GroupViewset(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def retrieve(self, request, *args, **kwargs): 
        instance = self.get_object()
        serializer = GroupFullSerializer(instance, many=False, context={'request': request})
        return Response(serializer.data)


class EventViewset(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

