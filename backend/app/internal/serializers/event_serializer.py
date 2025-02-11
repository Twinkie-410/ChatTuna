from rest_framework import serializers

from app.internal.models.event_model import Event
from app.internal.models.registration_event_model import RegistrationEvent
from app.internal.serializers.image_serializer import ImageSerializer
from app.internal.serializers.tguser_serializer import TGUserSerializer


class EventSerializer(serializers.ModelSerializer):
    image_detail = ImageSerializer(source="image", read_only=True)
    free_places = serializers.IntegerField(source="free_places_annotate", read_only=True)

    class Meta:
        model = Event
        fields = "__all__"
        extra_kwargs = {"images": {"required": False, "allow_empty": True}}


class RegistrationEventSerializer(serializers.ModelSerializer):
    event_name = serializers.CharField(source="event.name", read_only=True)
    user = TGUserSerializer(read_only=True)

    class Meta:
        model = RegistrationEvent
        fields = "__all__"


class EventSubmissionSerializer(serializers.ModelSerializer):
    event_name = serializers.CharField(source="event.name", read_only=True)
    user_name = serializers.CharField(source="user.first_name", read_only=True)

    class Meta:
        model = RegistrationEvent
        fields = ["id", "event_name", "user_name", "submission"]
