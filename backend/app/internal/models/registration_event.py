from django.db import models
from event import Event

class RegistrationEvent(models.Model):
    external_id = models.PositiveIntegerField(unique=True)
    user = models.PositiveIntegerField()
    event = models.OneToOneField(Event, on_delete = models.CASCADE, primary_key = True)
    subscribe = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.external_id} {self.event}"

    class Meta:
        verbose_name = "Регистрация мероприятия"
