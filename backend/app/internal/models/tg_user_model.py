from django.db import models


class TGUser(models.Model):
    external_id = models.PositiveIntegerField(unique=True)
    first_name = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    age = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.external_id} {self.username}"

    class Meta:
        verbose_name = "ТГ-Пользователь"
        verbose_name_plural = "ТГ-Пользователи"
