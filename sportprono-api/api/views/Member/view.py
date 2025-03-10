from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ...models import CustomUser, Group, Member
from ...serializers import MemberSerializer


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @action(methods=["POST"], detail=False)
    def join(self, request):
        if "group" in request.data and "user" in request.data:
            group = Group.objects.get(id=request.data["group"])
            user = CustomUser.objects.get(id=request.data["user"])

            member, created = Member.objects.get_or_create(group=group, user=user)
            serializer = MemberSerializer(member, many=False)
            message = "Joined group" if created else "User allready in this group"
            type = "success" if created else "warning"
            response = {"message": message, "results": serializer.data, "type": type}
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {"message": "Wrongs params"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["POST"], detail=False)
    def leave(self, request):
        if "group" in request.data and "user" in request.data:
            group = Group.objects.get(id=request.data["group"])
            user = CustomUser.objects.get(id=request.data["user"])

            member = Member.objects.get(group=group, user=user)
            member.delete()
            response = {"message": "Leave group"}
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {"message": "Wrongs params"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
