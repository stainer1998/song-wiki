from rest_framework import serializers
from apps.catalog.models import SongCredit


class SongCreditSerializer(serializers.ModelSerializer):
    person_name = serializers.CharField(source='person.full_name', read_only=True)
    song_title = serializers.CharField(source='song.title', read_only=True)
    role_display = serializers.CharField(source='get_role_display', read_only=True)

    class Meta:
        model = SongCredit
        fields = '__all__'
