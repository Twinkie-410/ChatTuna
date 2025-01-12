from app.internal.models.tg_user_model import TGUser
from django.contrib import admin
from django.contrib.admin import ModelAdmin


@admin.register(TGUser)
class TGUserAdmin(ModelAdmin):
    pass
