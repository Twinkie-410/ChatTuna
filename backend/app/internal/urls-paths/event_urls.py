from django.urls import path

from app.internal.views.event_view import EventListAPIView, EventCreateAPIView, EventDetailAPIView, EventUsersAPIView, \
    EventSubmissionAPIView

urlpatterns = [
    path("list/", EventListAPIView.as_view(), name="event-list"),
    path("create/", EventCreateAPIView.as_view(), name="event-create"),
    path("detail/<int:id>/", EventDetailAPIView.as_view(), name="event-detail"),
    path("<int:id>/users/", EventUsersAPIView.as_view(), name="event-users"),
    path("<int:id>/submissions/", EventSubmissionAPIView.as_view(), name="event-submissions"),
]