from rest_framework import filters, pagination, status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.exceptions import NotAuthenticated
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from ...models import Group, Member
from ...serializers import GroupFullSerializer, GroupSerializer


class GroupPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 20


class GroupViewset(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrReadOnly,)
    filter_backends = [filters.SearchFilter]
    search_fields = ["searchCode"]
    pagination_class = GroupPagination

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = GroupFullSerializer(instance, many=False, context={"request": request})
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        user = request.user

        if not user or user.is_anonymous:  # Vérifie si l'utilisateur est authentifié
            raise NotAuthenticated("Vous devez être connecté pour voir vos groupes.")

        groups = Group.objects.filter(members__user=user)
        page = self.paginate_queryset(groups)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(groups, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        access = data.pop("access", None)

        if access:
            data['is_private'] = access[0] == 'private'

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        instance = serializer.instance
        member, _ = Member.objects.get_or_create(group=instance, user=request.user, admin=True)

        return Response(
            {
                "message": "Votre nouveau groupe à été créé !",
                "group": serializer.data,
            },
            status=status.HTTP_201_CREATED
        )

    @action(detail=False, methods=['GET'])
    def search(self, request):
        search_query = request.query_params.get('q', "")
        if not search_query:
            return Response({"error": "Veuillez fournir un SearchCode"}, status=status.HTTP_400_BAD_REQUEST)

        groups = Group.objects.filter(searchCode=search_query)
        serializer = self.get_serializer(groups, many=True)

        return Response(serializer.data)
