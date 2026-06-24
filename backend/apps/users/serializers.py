from rest_framework import serializers
from .models import CustomUser


class UserMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'role')
        read_only_fields = fields
