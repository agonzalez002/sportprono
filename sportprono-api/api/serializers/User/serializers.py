from rest_framework import serializers
from rest_framework.authtoken.models import Token

from django.conf import settings

from ...models import UserProfile, CustomUser


class UserProfileSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ('id', 'image', 'image_url', 'is_premium', 'bio')

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            else:
                return f"{settings.SITE_URL}{obj.image.url}"
        return None


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password', 'profile')
        extra_kwargs = {
            'password': {
                'write_only': True, 
                'required': False,
                }
            }
        
    def create(self, validated_data):
        profile_data = validated_data.pop('profile', None)
        user = CustomUser.objects.create_user(**validated_data)
        if profile_data:
            UserProfile.objects.create(user=user, **profile_data)
        Token.objects.create(user=user)
        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)