from django.db.models import Count, F

from app.internal.models.event_model import Event


class AnnotatedEventMixin:
    def get_queryset(self):
        return Event.objects.annotate(
            booked_places_annotate=Count('registrationevent')
        ).annotate(
            free_places_annotate=F('places') - F('booked_places_annotate')
        )
