from django.urls import path

from app.internal.views.tg_user_view import TGUsersListAPIView

urlpatterns = [
    path("list/", TGUsersListAPIView.as_view(), name="tg-user-list"),
]
