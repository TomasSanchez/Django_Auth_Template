from .models import User

from rest_framework import serializers

from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for Authentication User.
    """

    about = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    user_name = serializers.SerializerMethodField()
    start_date = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'user_name', 'start_date', 'about', 'password')
        extra_kwargs = {'password': {'write_only': True}}


    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def get_about(self, obj):
        return obj.user_account.about

    def get_first_name(self, obj):
        return obj.user_account.first_name

    def get_last_name(self, obj):
        return obj.user_account.last_name

    def get_user_name(self, obj):
        return obj.user_account.user_name

    def get_start_date(self, obj):
        return obj.user_account.start_date


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    new_password2 = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value