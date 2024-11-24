from django.db import models

from app.internal.models.tg_user_model import TGUser
from app.internal.models.event_model import Event


class Activity(models.Model):
    users = models.ManyToManyField(TGUser, through="RegistrationActivity")
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    datetime_start = models.DateTimeField()
    datetime_end = models.DateTimeField()
    description = models.TextField()
    organizer = models.CharField(max_length=255)
    places = models.PositiveIntegerField()
    free_places = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.id}"

    class Meta:
        verbose_name = "Активность"
