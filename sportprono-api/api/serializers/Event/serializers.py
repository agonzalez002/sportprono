from rest_framework import serializers
from ..Bet.serializers import BetSerializer
from ...models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'team1', 'team2', 'time', 'group', 'score1', 'score2', 'team1_bonus', 'team2_bonus')


class EventFullSerializer(serializers.ModelSerializer):
    bets = BetSerializer(many=True)

    class Meta:
        model = Event
        fields = ('id', 'team1', 'team2', 'time', 'score1', 'score2', 'group', 'bets', 'team1_bonus', 'team2_bonus')
