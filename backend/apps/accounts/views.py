from .models import Account
from .serializers import AccountSerializer

from django.db.models.query import QuerySet
from django.contrib.auth import get_user_model

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

User = get_user_model()


class UserList(generics.ListAPIView):
    """ Returns all users, not necessary"""

    permission_classes=[AllowAny]
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class UserDetail(generics.RetrieveAPIView):
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

# TEST
class UpdateUserInfo(generics.UpdateAPIView):
    """ 
    After registration user may be prompted to complete the rest of the account, 
    This is customizable to fit your needs, I included basic info such as username firstname lastname 
    Later on user can update their profile info
    """

    permission_classes = [IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        # Partial = True so user can complete only the fields they want
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data, status=status.HTTP_200_OK)

#TEST
class DeleteAccount(generics.DestroyAPIView):

    permission_classes = [IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def destroy(self, request, *args, **kwargs):
        user = request.user
        instance = self.get_object()
        # Check if current authenticated user is the same user instance linked to the account, then delete both instances
        if instance.user == user:
            self.perform_destroy(instance, user)
            return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance, user):
        instance.delete()
        user.delete()
