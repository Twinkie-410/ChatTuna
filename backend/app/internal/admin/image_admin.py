from app.internal.models.image_model import Image
from django.contrib import admin


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ("id", "__str__")