from rest_framework import serializers
from ...models import Group, Bet

from ..Event.serializers import EventSerializer
from ..Member.serializers import MemberSerializer

from django.db.models import Sum


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
            points = Bet.objects.filter(event__group=obj, user=member.user.id).aggregate(
                pts=Sum('points')
            )
            member_serialized = MemberSerializer(member, many=False)
            member_data = member_serialized.data
            member_data['points'] = points['pts'] or 0
            member_data.pop('group')
            people_points.append(member_data)

        return people_points