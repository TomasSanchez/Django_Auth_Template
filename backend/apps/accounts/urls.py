from django.urls import path
from .views import UserList, UserDetail, LoggedInUserDetail, UpdateUserInfo, DeleteAccount

app_name = 'users'

urlpatterns = [
    path('', UserList.as_view(), name='account_list'),                                # Returns All users
    path('profile',LoggedInUserDetail.as_view(), name='logged_user_detail'),          # Returns detail information of the current authenticated user
    path('detail/<int:pk>',UserDetail.as_view(), name='account_detail'),              # returns a user
    path('update/<int:pk>',UpdateUserInfo.as_view(), name='update_account'),          # update info of a user
    path('delete/<int:pk>',DeleteAccount.as_view(), name='delete_account'),           # delete user

]