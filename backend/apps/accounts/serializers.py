from rest_framework import serializers
from .models import Account


class AccountSerializer(serializers.ModelSerializer):

    def get_email(self, obj):
        pass

    email = serializers.SerializerMethodField()

    class Meta:
        model = Account
        fields = ('id', 'user',  'email', 'first_name', 'last_name', 'user_name', 'start_date', 'about')

