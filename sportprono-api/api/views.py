from django.utils import timezone
from django.db import transaction
from django.utils.crypto import get_random_string
from .models import Group, Event, UserProfile, Member, Bet, CustomUser
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
    ChangeDataSerializer,
    ForgotPasswordSerializer,
)
from .signals import events_bulk_update_done
from .utils import send_html_email


class GroupViewset(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrReadOnly,)


    def retrieve(self, request, *args, **kwargs): 
        instance = self.get_object()
        serializer = GroupFullSerializer(instance, many=False, context={'request': request})
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        access = request.data.pop('access', None)
        request.data['is_private'] = access[0] == 'private'
        super().create(request, *args, **kwargs)
        return Response({'message': 'Votre nouveau groupe à été créé !'}, status=status.HTTP_200_OK)


class EventViewset(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs): 
        instance = self.get_object()
        serializer = EventFullSerializer(instance, many=False, context={'request': request})
        return Response(serializer.data)
    
    @action(methods=['PUT'], detail=False, permission_classes=[IsAuthenticated], url_path='set_results')
    def set_results(self, request):
        if not isinstance(request.data, dict):
            return Response({'error': 'Invalid data format. Expected a dictionnary.'})
        
        event_ids = list(request.data.keys())
        events = Event.objects.filter(id__in=event_ids)
        event_dict = {event.id: event for event in events}
        errors = []
        events_to_update = []

        for event_id, scores in request.data.items():
            try:
                event = event_dict.get(int(event_id))

                if not event:
                    errors.append(f"Event with id {event_id} does not exist.")
                    continue

                if not event.time < timezone.now():
                    errors.append(f"Event with id {event_id} was not played yet.")
                    continue

                score1 = scores.get('score1')
                score2 = scores.get('score2')

                if score1 is None or score2 is None:
                    errors.append(f"Scores missing for event {event_id}")
                    continue

                if not isinstance(score1, int) or not isinstance(score2, int):
                    errors.append(f"Invalid scores for event {event_id}. Must be integers.")
                    continue
                    
                event.score1 = score1
                event.score2 = score2
                events_to_update.append(event)
            except Exception as e:
                errors.append(f"Error updating event {event_id}: {str(e)}")
            
        if events_to_update:
            with transaction.atomic():
                Event.objects.bulk_update(events_to_update, ['score1', 'score2'])
                events_bulk_update_done.send(sender=self.__class__, updated_events=events_to_update)
        if errors:
            return Response({'message': 'Some scores could not be updated', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Scores updated successfully!'}, status=status.HTTP_200_OK)


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = CustomUser.objects.get(id=token.user_id)
        user_serializer = UserSerializer(user, many=False)
        return Response({'token': token.key, 'user': user_serializer.data})


class UserProfileViewset(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    @action(methods=['PUT'], detail=True, serializer_class=ChangePasswordSerializer, permission_classes=[IsAuthenticated])
    def change_password(self, request, pk):
        user = CustomUser.objects.get(pk=pk)
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            if not user.check_password(serializer.data.get('old_password')):
                return Response({'message': "Wrong old password"}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.data.get('new_password'))
            user.save()
            return Response({'message': 'Password updated'}, status=status.HTTP_200_OK)

    @action(methods=['PUT'], detail=True, serializer_class=ChangeDataSerializer, permission_classes=[IsAuthenticated])
    def change_data(self, request, pk):
        user = CustomUser.objects.get(pk=pk)
        serializer = ChangeDataSerializer(data=request.data)

        if serializer.is_valid():
            user.username = serializer.data.get('username')
            user.email = serializer.data.get('email')
            user.first_name = serializer.data.get('first_name')
            user.last_name = serializer.data.get('last_name')
            user.save()
            return Response({'message': 'Informations mises à jour !', 'result': serializer.data}, status=status.HTTP_200_OK)
        
    @action(methods=['POST'], detail=False, serializer_class=ForgotPasswordSerializer, url_path='forgot_password')
    def forgot_password(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)

        if serializer.is_valid():
            try:
                user = CustomUser.objects.get(email=serializer.data.get('email'))
            except CustomUser.DoesNotExist:
                return Response({'message': "Cet email n'est pas utilisé dans un compte d'utilisateur"}, status=status.HTTP_400_BAD_REQUEST)
            new_password = get_random_string(length=10)
            user.set_password(new_password)
            user.save()
            email_data = {
                "username": user.username,
                "password": new_password,
            }
            send_html_email('Nouveau mot de passe', [user.email], 'emails/forgot_password.html', email_data)
            message = "Un email vient de vous être envoyé avec votre nouveau mot de passe."
            return Response({'message': message}, status=status.HTTP_200_OK)
        return Response({'message': 'Email non valide'}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = CustomUser.objects.get(pk=response.data['id'])
        serializer = UserSerializer(user, many=False)
        new_profile = UserProfile.objects.create(user_id=response.data['id'])
        profile_serializer = UserProfileSerializer(new_profile, many=False)
        serializer.data['profile'] = profile_serializer.data
        message = {'message': 'User created !', 'result': serializer.data}
        return Response(message, status=status.HTTP_200_OK)


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @action(methods=['POST'], detail=False)
    def join(self, request):
        if 'group' in request.data and 'user' in request.data:
            group = Group.objects.get(id=request.data['group'])
            user = CustomUser.objects.get(id=request.data['user'])

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
            user = CustomUser.objects.get(id=request.data['user'])

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

    def create(self, request, *args, **kwargs):
        response = {'message': "Method not allowed"}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def update(self, request, *args, **kwargs):
        response = {'message': "Method not allowed"}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @action(detail=False, methods=['POST'], url_path='place_bet')
    def place_bet(self, request):
        if 'event_id' in request.data and 'score1' in request.data and 'score2' in request.data:
            event_id = request.data['event_id']
            event = Event.objects.get(id=event_id)

            in_group = Member.objects.filter(user=request.user, group=event.group).exists()

            if event.time > timezone.now() and in_group:
                score1 = request.data['score1']
                score2 = request.data['score2']

                my_bet, created = Bet.objects.get_or_create(event_id=event_id, user_id=request.user.id)
                my_bet.score1 = score1
                my_bet.score2 = score2
                my_bet.save()
                serializer = BetSerializer(my_bet, many=False)
                message = 'Bet created' if created else 'Bet updated'
                response = {'message': message, 'new': created, 'result': serializer.data}
                response_status = status.HTTP_200_OK
            else:
                response = {'message': "Yon can't place a bet. Too late !"}
                response_status=status.HTTP_400_BAD_REQUEST
        else:
            response = {'message': "Wrong params"}
            response_status = status.HTTP_400_BAD_REQUEST
        return Response(response, status=response_status)
