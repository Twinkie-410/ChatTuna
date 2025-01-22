from app.internal.models.event_model import Event
from django.contrib import admin
from django.contrib.admin import ModelAdmin

from app.internal.models.registration_event_model import RegistrationEvent


class EventUsersInline(admin.TabularInline):
    model = RegistrationEvent
    extra = 1


@admin.register(Event)
class EventAdmin(ModelAdmin):
    inlines = (EventUsersInline,)
