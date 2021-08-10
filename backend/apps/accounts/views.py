from .models import Account
from .serializers import AccountSerializer

from django.shortcuts import render
from django.db.models.query import QuerySet
from django.contrib.auth import get_user_model

from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated

User = get_user_model()


class UserList(generics.ListAPIView):
    """ Returns all users, not necessary"""

    permission_classes=[AllowAny]
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """ Returns a single User """

    permission_classes=[AllowAny]
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class LoggedInUserDetail(generics.ListAPIView):
    """ Returns the profile of the current authenticated user, not necessary"""

    permission_classes = [IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_queryset(self):
       
        assert self.queryset is not None, (
            "'%s' should either include a `queryset` attribute, "
            "or override the `get_queryset()` method."
            % self.__class__.__name__
        )
        user = User.objects.get(id=self.request.user.id)

        queryset = self.queryset
        if isinstance(queryset, QuerySet):
            # Ensure queryset is re-evaluated on each request.
            queryset = queryset.filter(user=user.id)
        return queryset