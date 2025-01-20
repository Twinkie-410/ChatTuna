from django.urls import path

from app.internal.views.notofication_view import SendNotificationAPIView

urlpatterns = [
    path("send/", SendNotificationAPIView.as_view(), name="notifications-send"),
]