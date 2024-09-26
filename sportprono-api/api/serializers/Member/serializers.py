from rest_framework import serializers
from ...models import Member

from ..User.serializers import UserSerializer

class MemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)

    class Meta:
        model = Member
        fields = ('group', 'user', 'admin')