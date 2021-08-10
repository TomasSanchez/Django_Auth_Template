from django.db import models
from django.conf import settings


class Account(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_account' )
    user_name = models.CharField(max_length=100, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    start_date = models.DateTimeField(auto_now_add=True)
    about = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} linked to: {self.user}"
