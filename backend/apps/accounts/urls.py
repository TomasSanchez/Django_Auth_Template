from django.urls import path
from .views import LoggedInUserDetail, UserDetail, UserList

app_name = 'users'

urlpatterns = [
    path('', UserList.as_view(), name='user_list'),                             # Returns All users
    path('profile',LoggedInUserDetail.as_view(), name='logged_user_detail'),    # Returns detail information of the current authenticated user
    path('<int:pk>',UserDetail.as_view(), name='user_detail'),                  # RetrieveUpdateDestroy a user
]