from rest_framework.generics import ListAPIView

from app.internal.models.tg_user_model import TGUser
from app.internal.serializers.tguser_serializer import TGUserSerializer


class TGUsersListAPIView(ListAPIView):
    serializer_class = TGUserSerializer
    queryset = TGUser.objects.all()
