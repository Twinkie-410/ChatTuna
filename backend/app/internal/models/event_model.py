from django.db import models

from app.internal.models.image_model import Image
from app.internal.models.tg_user_model import TGUser


def upload_image(instance: "Event", filename: str):
    return f"{instance.name}/{instance.name}.{filename.split('.')[-1]}"


class Event(models.Model):
    users = models.ManyToManyField(TGUser, through="RegistrationEvent")
    name = models.CharField(max_length=255)
    datetime_start = models.DateTimeField()
    datetime_end = models.DateTimeField()
    address = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    # image = models.ForeignKey(Image, on_delete=models.SET_NULL, null=True, blank=True)
    image = models.ImageField(upload_to=upload_image, null=True, blank=True, verbose_name="изображение")
    organizer = models.CharField(max_length=255)
    contacts = models.CharField(max_length=255)
    places = models.PositiveIntegerField()

    # free_places = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.id} {self.name}"

    class Meta:
        verbose_name = "Мероприятие"
        verbose_name_plural = "Мероприятия"

    @property
    async def booked_places(self):
        return await self.users.acount()

    @property
    async def free_places(self):
        return self.places - await self.booked_places
