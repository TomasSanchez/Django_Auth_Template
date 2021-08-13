import json

from .models import User
from .serializers import UserSerializer, ChangePasswordSerializer

from django.http import JsonResponse
from django.core.mail import send_mail
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.tokens import default_token_generator

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated



def get_csrf(request):
    """ Sets csrf cookie """
    response = JsonResponse({"detail": "Success - Set CSRF cookie."}, status=status.HTTP_202_ACCEPTED)
    response["X-CSRFToken"] = get_token(request)
    return response


@require_POST
def login_view(request):
    """ Log in via email and password (Basic Setup) if user is not active, send verification email """

    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    if email is None or password is None:
        return JsonResponse({"detail": "Please enter both username and password."},status=status.HTTP_400_BAD_REQUEST)
    user = authenticate(email=email, password=password)

    if user is not None:
        if user.is_active:
            login(request=request,user=user, backend='django.contrib.auth.backends.ModelBackend')            
            return JsonResponse({"detail": "User logged in successfully."}, status=status.HTTP_200_OK)

        send_verification_email(user=user, path='/account/activate', subject='Account activation for Django App.', message='Go to the following link to activate your account.')
        return JsonResponse({"detail": "Account activation needed, Email with activation link sent."}, status=status.HTTP_204_NO_CONTENT)

    return JsonResponse({"detail": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)


@require_POST
def logout_view(request):
    """ Logout view """
    if not request.user.is_authenticated:
        return JsonResponse({"detail": "User is not logged in"}, status=status.HTTP_400_BAD_REQUEST)
    logout(request)
    return JsonResponse({"detail": "Logout Successful."})


class WhoAmI(APIView):
    """ Used for checking if user is logged in """

    permission_classes = [AllowAny]

    @staticmethod
    def get(request, format=None):
        if request.user.is_authenticated:
            user = request.user
            serializer = UserSerializer(user)
            return Response({'detail':'LoggedIn','user':serializer.data})
        return Response({'detail':'AnonymousUser'})


class CreateUser(APIView):
    """ Creates Users, used for signup/register"""

    permission_classes = [AllowAny]

    def post(self, request):
        reg_serializer = UserSerializer(data=request.data)
        if reg_serializer.is_valid():
            new_user = reg_serializer.save() 
            if new_user:
                send_verification_email(user=new_user, path='/account/activate', subject='Account activation for Django App.', message='Go to the following link to activate your account.')
                return Response({'detail': 'User Created.'}, status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyUser(APIView):
    """
    Api endpoint for verifying a user account after creation/registration
    expects a body of {
        id: some_id
        token: 'some_token'
    }
    """
    permission_classes = [AllowAny]

    def post(self, request):
        data = json.loads(request.body)
        user = User.objects.get(id=data['id'])
        token = data['token']
        if default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({'detail': 'User Activated.'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'detail': 'Invalid Token.'}, status=status.HTTP_400_BAD_REQUEST)

# TEST
class ChangePassword(GenericAPIView):
    """
    Api for changing a user password.
    expects a body of {
        old_password :'old_pass'
        new_password: 'new_password'
        new_password2: 'new_password'
    }

    """
    permission_classes = [IsAuthenticated]

    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        print(f" ----------------------------- \n request: {request} \n-----------------------------")
        print(f" ----------------------------- \n request.data: {request.data} \n-----------------------------")
        self.object = self.get_object()
        print(f" ----------------------------- \n self.object: {self.object} \n-----------------------------")
        # user = self.request.user
        serializer = ChangePasswordSerializer(data=request.data)
        print(f" ----------------------------- \n serializer: {serializer} \n-----------------------------")

        if serializer.is_valid():
            # Check old password
            old_password = serializer.data.get("old_password")
            if not self.object.check_password(old_password):
                return Response({"detail": "Wrong password."}, status=status.HTTP_400_BAD_REQUEST)
            new_password = serializer.data.get("new_password")
            new_password2 = serializer.data.get("new_password2")
            if new_password != new_password2:
                return Response({'detail','Passwords don\'t match'}, status=status.HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# TEST
class RequestResetPassword(APIView):
    """
    Api endpoint for a requesting user to resset his password.
    expects a body of {
        user_id: "1" 
        or 
        email: "user@email.com" 

    }
    """
    permission_classes = [AllowAny]

    def post(self, request):
        print(f" ----------------------------- \n request: {request} \n-----------------------------")
        print(f" ----------------------------- \n request.body: {request.body} \n-----------------------------")
        data = json.loads(request.body)
        print(f" ----------------------------- \n data: {data} \n-----------------------------")
        # Check if data contains user_id or email as the request cant be sent from login, or re request token from reset page which has acces to user id but not email
        if 'user_id' in data:
            user = User.objects.get(email=data['user_id'])
        elif 'email' in data:
            user = User.objects.get(email=data['email'])
        else:
            Response({'detail': 'Request need to include a user id or a user email'}, status=status.HTTP_400_BAD_REQUEST)
        print(f" ----------------------------- \n user: {user} \n-----------------------------")
        send_verification_email(user=user, path='/reset', subject='Password Reset for Django App.', message='Go to the following link to reset your password.')
        return Response({'detail': 'Email for password reset sent.'}, status=status.HTTP_204_NO_CONTENT)

# TEST
class VerifyResetPassword(APIView):
    """
    Api endpoint for verifying a user's resset password token
    expects a body of {
        token: "random_token",
        user_id: "1" 
    }
    """
    permission_classes = [AllowAny]

    def post(self, request):
        print(f" ----------------------------- \n request: {request} \n-----------------------------")
        print(f" ----------------------------- \n request.body: {request.body} \n-----------------------------")
        data = json.loads(request.body)
        print(f" ----------------------------- \n data: {data} \n-----------------------------")
        user = User.objects.get(id=data['user_id'])
        token = data['token']
        print(f" ----------------------------- \n user: {user} \n-----------------------------")
        print(f" ----------------------------- \n token: {token} \n-----------------------------")
        if default_token_generator.check_token(user, token):
            return Response({'detail': 'Valid Token.'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'detail': 'Invalid Token.'}, status=status.HTTP_400_BAD_REQUEST)

# TEST
class ResetPassword(GenericAPIView):
    """
    Api endpoint for resseting a user's password
    expects a body of {
        token: "random_token"
        new_password: "yournewpassword",
        new_password2: "yournewpassword",
        user_id: "1" 
        
    }
    """
    permission_classes = [AllowAny]

    def put(self, request, *args, **kwargs):
        print(f" ----------------------------- \n request: {request} \n-----------------------------")
        print(f" ----------------------------- \n request.data: {request.data} \n-----------------------------")
        data = request.data
        user = User.objects.get(id=data['user_id'])
        if default_token_generator.check_token(user, data['token']):
            new_password = data.get("new_password")
            new_password2 = data.get("new_password2")
            if new_password == new_password2:
                user.set_password(data.get("new_password"))
                user.save()
                return Response({'detail': 'Password reset success.'}, status=status.HTTP_204_NO_CONTENT)
            return Response({'detail','Passwords don\'t match'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'detail': 'Invalid Token.'}, status=status.HTTP_400_BAD_REQUEST)


def send_verification_email(user, path, subject, message):
    """
    Creates a token and sends mail to user with activation link
    used with account activation or with password resset
    """

    verification_token = default_token_generator.make_token(user=user)
    verification_link = f"http://localhost:3000{path}?user_id={user.id}&verification_token={verification_token}"
    send_mail(
        subject,
        f'{message} {verification_link}',
        'from@example.com',
        [user.email],
    )