from rest_framework import serializers
from apps.catalog.models import Artist


class ArtistSerializer(serializers.ModelSerializer):
    nationality_name = serializers.CharField(source='nationality.name', read_only=True)

    class Meta:
        model = Artist
        fields = '__all__'
        read_only_fields = ('slug',)
