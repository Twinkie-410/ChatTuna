from rest_framework.generics import RetrieveUpdateDestroyAPIView, CreateAPIView, ListAPIView

from app.internal.models.event_model import Event
from app.internal.models.registration_event_model import RegistrationEvent
from app.internal.serializers.event_serializer import EventSerializer, RegistrationEventSerializer


class EventListAPIView(ListAPIView):
    serializer_class = EventSerializer
    queryset = Event.objects.all()


class EventCreateAPIView(CreateAPIView):
    serializer_class = EventSerializer


class EventDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = EventSerializer
    lookup_field = "id"
    queryset = Event.objects.all()


class EventUsersAPIView(ListAPIView):
    serializer_class = RegistrationEventSerializer

    def get_queryset(self):
        event = Event.objects.filter(id=self.kwargs["id"]).first()
        if event:
            return RegistrationEvent.objects.filter(event=event)
        return
