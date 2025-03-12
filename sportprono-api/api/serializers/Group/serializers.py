from django.conf import settings
from django.db.models import Sum
from rest_framework import serializers

from ...models import Bet, Group, Member
from ..Event.serializers import EventSerializer
from ..Member.serializers import MemberSerializer


class GroupSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Group
        fields = ("id", "name", "image", "image_url", "code", "is_private", "searchCode")

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image:
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            else:
                return f"{settings.SITE_URL}{obj.image.url}"
        return None


class GroupFullSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True)
    creator = serializers.SerializerMethodField()
    members = serializers.SerializerMethodField()

    class Meta:
        model = Group
        fields = ("id", "name", "image", "code", "events", "members", "creator")

    def get_members(self, obj):
        people_points = []
        members = obj.members.all()

        for member in members:
            points = Bet.objects.filter(event__group=obj, user=member.user.id).aggregate(pts=Sum("points"))
            member_serialized = MemberSerializer(member, many=False)
            member_data = member_serialized.data
            member_data["points"] = points["pts"] or 0
            member_data.pop("group")
            people_points.append(member_data)

        return people_points

    def get_creator(self, obj):
        admin = Member.objects.get(group=obj, admin=True)
        return admin.user.username
