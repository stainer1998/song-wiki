from rest_framework import serializers
from apps.catalog.models import Person


class PersonSerializer(serializers.ModelSerializer):
    nationality_name = serializers.CharField(source='nationality.name', read_only=True)

    class Meta:
        model = Person
        fields = '__all__'
        read_only_fields = ('slug',)
