from django.db import models
from app.internal.models.activity_model import Activity
from app.internal.models.tg_user_model import TGUser


class RegistrationActivity(models.Model):
    user = models.ForeignKey(TGUser, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    subscribe = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id}"

    class Meta:
        verbose_name = "Регистрация активности"
