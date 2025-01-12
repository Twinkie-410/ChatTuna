from app.internal.models.image_model import Image
from app.internal.serializers.image_serializer import ImageSerializer
from rest_framework import parsers
from rest_framework.generics import CreateAPIView


class ImageCreateAPIView(CreateAPIView):
    serializer_class = ImageSerializer
    parser_classes = [parsers.MultiPartParser]
    queryset = Image.objects.all()