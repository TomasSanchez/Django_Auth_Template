from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include("apps.users.urls", namespace="users")),
    path('api/accounts/', include("apps.accounts.urls", namespace="accounts")),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

urlpatterns =+ [re_path(r'^.*', TemplateView.as_view(template_name='index.html')) ]

