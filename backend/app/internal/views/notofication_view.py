from asgiref.sync import async_to_sync
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from app.bot.services.sender_message_service import send_message
from app.internal.models.event_model import Event
from app.internal.serializers.notification_serializer import NotificationsSerializer


class SendNotificationAPIView(GenericAPIView):
    serializer_class = NotificationsSerializer

    def get_queryset(self):
        return Event.objects.filter(id=self.request.data["event"])

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        event = Event.objects.get(id=serializer.data["event"])
        users = event.users.all()
        message = serializer.data["text"]
        reminder_msg = f"вы получили это сообщение потому что подписаны на мероприятие <b>{event.name}</b>"
        for user in users:
            async_to_sync(send_message)(user_id=user.external_id, msg=message)
            async_to_sync(send_message)(user_id=user.external_id, msg=reminder_msg)
        return Response({"Ok": {"рассылка успешно отправлена"}})
