from django.db import models
from event import Event

class Activity(models.Model):
    external_id = models.PositiveIntegerField(unique=True)
    event = models.ManyToOneRel(Event, on_delete = models.CASCADE, primary_key = True)
    datetime_start = models.DateTimeField()
    datetime_end = models.DateTimeField()
    description = models.TextField()
    organizer = models.CharField()
    places = models.PositiveBigIntegerField()
    free_places = models.PositiveBigIntegerField()
    
    def __str__(self):
        return f"{self.external_id} {self.event}"

    class Meta:
        verbose_name = "Активность"
