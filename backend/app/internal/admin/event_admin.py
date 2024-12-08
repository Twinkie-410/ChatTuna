from app.internal.models.event_model import Event
from django.contrib import admin
from django.contrib.admin import ModelAdmin


@admin.register(Event)
class EventAdmin(ModelAdmin):
    pass
