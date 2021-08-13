from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.contrib.auth import get_user_model

User = get_user_model()

class Account(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_account' )
    user_name = models.CharField(max_length=100, unique=True, blank=True, null=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    start_date = models.DateTimeField(auto_now_add=True)
    about = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} linked to: {self.user}"


def post_user_created_signal(sender, instance, created, **kwargs):
    if created:
        Account.objects.create(user=instance)

post_save.connect(post_user_created_signal, sender=User)