from rest_framework import serializers
from apps.catalog.models import Track


class TrackSerializer(serializers.ModelSerializer):
    song_title = serializers.CharField(source='song.title', read_only=True)
    album_title = serializers.CharField(source='album.title', read_only=True)

    class Meta:
        model = Track
        fields = '__all__'
