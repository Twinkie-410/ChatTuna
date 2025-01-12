from rest_framework import serializers

from app.internal.models.tg_user_model import TGUser


class TGUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TGUser
        fields = "__all__"
