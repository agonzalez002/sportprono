from rest_framework import serializers
from ...models import Group, Bet

from ..Event.serializers import EventSerializer
from ..Member.serializers import MemberSerializer


class GroupSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Group
        fields = ('id', 'name', 'location', 'description')


class GroupFullSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True)
    members = serializers.SerializerMethodField()
    
    class Meta:
        model = Group
        fields = ('id', 'name', 'location', 'description', 'events', 'members')

    def get_members(self, obj):
        people_points = []
        members = obj.members.all()

        for member in members:
            points = 0
            member_serialized = MemberSerializer(member, many=False)
            member_data = member_serialized.data
            member_bets = Bet.objects.filter(user_id=member_data["user"].get('id'))
            for bet in member_bets:
                if bet.points:
                    points += bet.points 
            member_data['points'] = points
            member_data.pop('group')

            people_points.append(member_data)

        return people_points