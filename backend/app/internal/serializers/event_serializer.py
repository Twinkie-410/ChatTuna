from rest_framework import serializers

from app.internal.models.event_model import Event
from app.internal.serializers.image_serializer import ImageSerializer


class EventSerializer(serializers.ModelSerializer):
    image_detail = ImageSerializer(source="image", read_only=True)

    class Meta:
        model = Event
        fields = "__all__"
        extra_kwargs = {"images": {"required": False, "allow_empty": True}}
