from django.urls import path
from .views import CreateUser, WhoAmI, get_csrf, login_view, logout_view

app_name = 'users'

urlpatterns = [
    path('get_csrf', get_csrf, name='get_csrf'),
    path('login', login_view, name='login'),
    path('logout', logout_view, name='logout'),
    path('create', CreateUser.as_view(), name='create'),
    path('whoami', WhoAmI.as_view(), name='check_current_user'),
]