from django.db import models

from app.internal.models.tg_user_model import TGUser
from app.internal.models.event_model import Event


class RegistrationEvent(models.Model):
    user = models.ForeignKey(TGUser, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    subscribe = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id}"

    class Meta:
        verbose_name = "Регистрация мероприятия"
