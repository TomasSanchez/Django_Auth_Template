import json

from .serializers import UserSerializer

from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
from django.contrib.auth import authenticate, login, logout

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny



def get_csrf(request):
    """ Sets csrf cookie """

    response = Response({"detail": "Success - Set CSRF cookie"}, status=status.HTTP_202_ACCEPTED)
    response["X-CSRFToken"] = get_token(request)
    return response


@require_POST
def login_view(request):
    """ Log in via email and password (Basic Setup)"""

    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    if email is None or password is None:
        return Response({"detail": "Please enter both username and password"},status=status.HTTP_400_BAD_REQUEST)
    user = authenticate(email=email, password=password)

    if user is not None:
        login(request, user)
        return Response({"detail": "User logged in successfully"}, status=status.HTTP_200_OK)
    return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


@require_POST
def logout_view(request):
    """ Logout view """

    logout(request)
    return Response({"detail": "Logout Successful"}, status=status.HTTP_200_OK)


class WhoAmI(APIView):
    """ Used for checking if user is loged in """

    permission_classes = [AllowAny]

    @staticmethod
    def get(request, format=None):
        if request.user.is_authenticated:
            user = request.user
            serializer = UserSerializer(user)
            return Response(serializer.data)
        return Response({'AnonymousUser'})


class CreateUser(APIView):
    """ Creates Users, used for signup/register"""

    permission_classes = [AllowAny]

    def post(self, request):
        reg_serializer = UserSerializer(data=request.data)
        if reg_serializer.is_valid():
            new_user = reg_serializer.save()
            if new_user:
                return Response({'detail': 'User Created'}, status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
