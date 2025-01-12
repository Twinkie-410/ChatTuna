from rest_framework.generics import RetrieveUpdateDestroyAPIView, CreateAPIView, ListAPIView

from app.internal.models.event_model import Event
from app.internal.serializers.event_serializer import EventSerializer
from app.internal.serializers.tguser_serializer import TGUserSerializer


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
    serializer_class = TGUserSerializer

    def get_queryset(self):
        event = Event.objects.filter(id=self.kwargs["id"]).first()
        if event:
            return event.users
        return
