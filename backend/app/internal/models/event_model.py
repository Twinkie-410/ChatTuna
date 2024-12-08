from django.db import models

from app.internal.models.image_model import Image
from app.internal.models.tg_user_model import TGUser


class Event(models.Model):
    users = models.ManyToManyField(TGUser, through="RegistrationEvent")
    name = models.CharField(max_length=255)
    datetime_start = models.DateTimeField()
    datetime_end = models.DateTimeField()
    address = models.CharField(max_length=255,blank=True)
    description = models.TextField(blank=True)
    image = models.ForeignKey(Image, on_delete=models.SET_NULL, null=True, blank=True)
    organizer = models.CharField(max_length=255)
    contacts = models.CharField(max_length=255)
    places = models.PositiveIntegerField()
    free_places = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.id} {self.name}"

    class Meta:
        verbose_name = "Мероприятие"
