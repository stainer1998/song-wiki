from rest_framework import serializers
from apps.catalog.models import OrchestraMember


class OrchestraMemberSerializer(serializers.ModelSerializer):
    person_name = serializers.CharField(source='person.full_name', read_only=True)
    artist_name = serializers.CharField(source='artist.name', read_only=True)

    class Meta:
        model = OrchestraMember
        fields = '__all__'
