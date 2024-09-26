from rest_framework import serializers
from ...models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'team1', 'team2', 'time', 'score1', 'score2', 'group')
