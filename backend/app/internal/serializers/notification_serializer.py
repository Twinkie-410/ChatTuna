from rest_framework import serializers

from app.internal.models.event_model import Event
from app.internal.serializers.event_serializer import EventSerializer


class NotificationsSerializer(serializers.Serializer):
    text = serializers.CharField(max_length=400, required=True, allow_blank=False)
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
    # image =
    # time =
