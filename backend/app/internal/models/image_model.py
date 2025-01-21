from django.db import models


def upload_image(instance: "Image", filename: str):
    return f"{instance.name}/{instance.name}.{filename.split('.')[-1]}"


class Image(models.Model):
    name = models.CharField(max_length=255, verbose_name="имя", default="default")
    image = models.ImageField(upload_to=upload_image, verbose_name="изображение")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "изображение"
        verbose_name_plural = "изображения"

    def delete(self, using=None, keep_parents=False):
        self.image.delete()
        return super().delete()