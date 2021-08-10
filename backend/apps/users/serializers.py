from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):

    def get_about(self, obj):
        pass

    def get_first_name(self, obj):
        pass

    def get_last_name(self, obj):
        pass

    def get_user_name(self, obj):
        pass

    def get_start_date(self, obj):
        pass


    about = serializers.SerializerMethodField()
    fist_name = serializers.SerializerMethodField()
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
