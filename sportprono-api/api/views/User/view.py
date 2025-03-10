from django.utils.crypto import get_random_string
from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from ...models import CustomUser, UserProfile
from ...serializers import (ChangeDataSerializer, ChangePasswordSerializer,
                            ForgotPasswordSerializer, UserProfileSerializer,
                            UserSerializer)
from ...utils import send_html_email


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data["token"])
        user = CustomUser.objects.get(id=token.user_id)
        user_serializer = UserSerializer(user, many=False)
        return Response({"token": token.key, "user": user_serializer.data})


class UserProfileViewset(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    @action(
        methods=["PUT"], detail=True, serializer_class=ChangePasswordSerializer, permission_classes=[IsAuthenticated]
    )
    def change_password(self, request, pk):
        user = CustomUser.objects.get(pk=pk)
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            if not user.check_password(serializer.data.get("old_password")):
                return Response({"message": "Wrong old password"}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.data.get("new_password"))
            user.save()
            return Response({"message": "Password updated"}, status=status.HTTP_200_OK)

    @action(methods=["PUT"], detail=True, serializer_class=ChangeDataSerializer, permission_classes=[IsAuthenticated])
    def change_data(self, request, pk):
        user = CustomUser.objects.get(pk=pk)
        serializer = ChangeDataSerializer(data=request.data)

        if serializer.is_valid():
            user.username = serializer.data.get("username")
            user.email = serializer.data.get("email")
            user.first_name = serializer.data.get("first_name")
            user.last_name = serializer.data.get("last_name")
            user.save()
            return Response(
                {"message": "Informations mises à jour !", "result": serializer.data}, status=status.HTTP_200_OK
            )

    @action(methods=["POST"], detail=False, serializer_class=ForgotPasswordSerializer, url_path="forgot_password")
    def forgot_password(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)

        if serializer.is_valid():
            try:
                user = CustomUser.objects.get(email=serializer.data.get("email"))
            except CustomUser.DoesNotExist:
                return Response(
                    {"message": "Cet email n'est pas utilisé dans un compte d'utilisateur"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            new_password = get_random_string(length=10)
            user.set_password(new_password)
            user.save()
            email_data = {
                "username": user.username,
                "password": new_password,
            }
            send_html_email("Nouveau mot de passe", [user.email], "emails/forgot_password.html", email_data)
            message = "Un email vient de vous être envoyé avec votre nouveau mot de passe."
            return Response({"message": message}, status=status.HTTP_200_OK)
        return Response({"message": "Email non valide"}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = CustomUser.objects.get(pk=response.data["id"])
        serializer = UserSerializer(user, many=False)
        new_profile = UserProfile.objects.create(user_id=response.data["id"])
        profile_serializer = UserProfileSerializer(new_profile, many=False)
        serializer.data["profile"] = profile_serializer.data
        message = {"message": "User created !", "result": serializer.data}
        return Response(message, status=status.HTTP_200_OK)
