from rest_framework import serializers
from ...models import Bet

from ..User.serializers import UserSerializer


class BetSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)

    class Meta:
        model = Bet
        fields = ('id', 'user', 'event', 'score1', 'score2')