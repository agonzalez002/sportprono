from rest_framework import serializers
from ..Bet.serializers import BetSerializer
from ...models import Event, Bet

from django.utils import timezone


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'team1', 'team2', 'time', 'group', 'score1', 'score2', 'team1_bonus', 'team2_bonus')


class EventFullSerializer(serializers.ModelSerializer):
    bets = serializers.SerializerMethodField()
    num_bets = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ('id', 'team1', 'team2', 'time', 'score1', 'score2', 'group', 'bets', 'team1_bonus', 'team2_bonus', 'num_bets')
    
    def get_num_bets(self, obj):
        return Bet.objects.filter(event_id=obj.id).count()
    
    def get_bets(self, obj):
        if obj.time < timezone.now():
            bets = Bet.objects.filter(event_id=obj.id)
        else:
            bets = Bet.objects.filter(event_id=obj.id, user_id=self.context['request'].user.id)
        serializer = BetSerializer(bets, many=True)
        return serializer.data
            
