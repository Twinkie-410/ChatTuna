from app.internal.views.image_view import ImageCreateAPIView
from django.urls import path

urlpatterns = [
    path("create/", ImageCreateAPIView.as_view(), name="image-create"),
]