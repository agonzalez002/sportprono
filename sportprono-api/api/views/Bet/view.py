from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ...models import Bet, Event, Member
from ...serializers import BetSerializer


class BetViewSet(viewsets.ModelViewSet):
    queryset = Bet.objects.all()
    serializer_class = BetSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        response = {"message": "Method not allowed"}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def update(self, request, *args, **kwargs):
        response = {"message": "Method not allowed"}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @action(detail=False, methods=["POST"], url_path="place_bet")
    def place_bet(self, request):
        if "event_id" in request.data and "score1" in request.data and "score2" in request.data:
            event_id = request.data["event_id"]
            event = Event.objects.get(id=event_id)

            in_group = Member.objects.filter(user=request.user, group=event.group).exists()

            if event.time > timezone.now() and in_group:
                score1 = request.data["score1"]
                score2 = request.data["score2"]

                my_bet, created = Bet.objects.get_or_create(event_id=event_id, user_id=request.user.id)
                my_bet.score1 = score1
                my_bet.score2 = score2
                my_bet.save()
                serializer = BetSerializer(my_bet, many=False)
                message = "Bet created" if created else "Bet updated"
                response = {"message": message, "new": created, "result": serializer.data}
                response_status = status.HTTP_200_OK
            else:
                response = {"message": "Yon can't place a bet. Too late !"}
                response_status = status.HTTP_400_BAD_REQUEST
        else:
            response = {"message": "Wrong params"}
            response_status = status.HTTP_400_BAD_REQUEST
        return Response(response, status=response_status)
