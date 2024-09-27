from django.contrib.auth.models import User
from .models import Group, Event, UserProfile, Member, Bet
from rest_framework import viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from .serializers import (
    GroupSerializer, 
    EventSerializer, 
    GroupFullSerializer, 
    UserSerializer, 
    UserProfileSerializer, 
    ChangePasswordSerializer,
    MemberSerializer,
    EventFullSerializer,
    BetSerializer,
)


class GroupViewset(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrReadOnly,)


    def retrieve(self, request, *args, **kwargs): 
        instance = self.get_object()
        serializer = GroupFullSerializer(instance, many=False, context={'request': request})
        return Response(serializer.data)


class EventViewset(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs): 
        instance = self.get_object()
        serializer = EventFullSerializer(instance, many=False, context={'request': request})
        return Response(serializer.data)



class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = User.objects.get(id=token.user_id)
        user_serializer = UserSerializer(user, many=False)
        return Response({'token': token.key, 'user': user_serializer.data})


class UserProfileViewset(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    @action(methods=['PUT'], detail=True, serializer_class=ChangePasswordSerializer, permission_classes=[IsAuthenticated])
    def change_password(self, request, pk):
        user = User.objects.get(pk=pk)
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            if not user.check_password(serializer.data.get('old_password')):
                return Response({'message': "Wrong old password"}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.data.get('new_password'))
            user.save()
            return Response({'message': 'Password updated'}, status=status.HTTP_200_OK)


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @action(methods=['POST'], detail=False)
    def join(self, request):
        if 'group' in request.data and 'user' in request.data:
            group = Group.objects.get(id=request.data['group'])
            user = User.objects.get(id=request.data['user'])

            member, created = Member.objects.get_or_create(group=group, user=user)
            serializer = MemberSerializer(member, many=False)
            message = 'Joined group' if created else 'User allready in this group'
            type = 'success' if created else 'warning'
            response = {'message': message, 'results': serializer.data, 'type': type}
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'message': 'Wrongs params'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        
    @action(methods=['POST'], detail=False)
    def leave(self, request):
        if 'group' in request.data and 'user' in request.data:
            group = Group.objects.get(id=request.data['group'])
            user = User.objects.get(id=request.data['user'])

            member = Member.objects.get(group=group, user=user)
            member.delete()
            response = {'message': 'Leave group'}
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'message': 'Wrongs params'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        

class BetViewSet(viewsets.ModelViewSet):
    queryset = Bet.objects.all()
    serializer_class = BetSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs): 
        instance = self.get_object()
        serializer = EventFullSerializer(instance, many=False, context={'request': request})
        return Response(serializer.data)

