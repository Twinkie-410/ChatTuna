from app.internal.models.registration_event_model import RegistrationEvent
from django.contrib import admin
from django.contrib.admin import ModelAdmin


@admin.register(RegistrationEvent)
class RegistrationEventAdmin(ModelAdmin):
    pass
