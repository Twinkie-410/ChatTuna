from django.db import models

class Event(models.Model):
    external_id = models.PositiveIntegerField(unique=True)
    name = models.CharField(max_length=255)
    datetime_start = models.DateTimeField()
    datetime_end = models.DateTimeField()
    adress = models.CharField()
    description = models.TextField()
    image = models.CharField()
    organizer = models.CharField()
    contacts = models.CharField()
    places = models.PositiveBigIntegerField()
    free_places = models.PositiveBigIntegerField()
    
    def __str__(self):
        return f"{self.external_id} {self.name}"

    class Meta:
        verbose_name = "Мероприятие"
