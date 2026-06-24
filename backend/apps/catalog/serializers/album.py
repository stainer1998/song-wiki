from rest_framework import serializers
from apps.catalog.models import Album


class AlbumSerializer(serializers.ModelSerializer):
    artist_name = serializers.CharField(source='artist.name', read_only=True)
    record_label_name = serializers.CharField(source='record_label.name', read_only=True)

    class Meta:
        model = Album
        fields = '__all__'
        read_only_fields = ('slug',)
