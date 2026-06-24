from rest_framework import serializers
from apps.catalog.models import RecordLabel


class RecordLabelSerializer(serializers.ModelSerializer):
    country_name = serializers.CharField(source='country.name', read_only=True)

    class Meta:
        model = RecordLabel
        fields = '__all__'
        read_only_fields = ('slug',)
