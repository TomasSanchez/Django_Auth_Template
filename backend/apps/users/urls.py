from django.urls import path
from .views import (
    CreateUser,
    WhoAmI,
    get_csrf,
    login_view,
    logout_view,
    VerifyUser,
    ChangePassword,
    RequestResetPasswordToken,
    VerifyResetPasswordToken,
    ResetPassword
)

app_name = 'users'

urlpatterns = [
    path('get_csrf', get_csrf, name='get_csrf'),
    path('login', login_view, name='login'),
    path('logout', logout_view, name='logout'),
    path('whoami', WhoAmI.as_view(), name='check_current_user'),
    path('create', CreateUser.as_view(), name='create'),
    path('verify', VerifyUser.as_view(), name='verify_user'),
    path('change_password', ChangePassword.as_view(), name='change_password'),
    path('reset_password_token', RequestResetPasswordToken.as_view(), name='req_reset_password'),
    path('reset_password_verify_token', VerifyResetPasswordToken.as_view(), name='reset_password_verify_token'),
    path('reset_password', ResetPassword.as_view(), name='reset_password'),
]