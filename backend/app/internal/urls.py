from django.urls import include, path

urlpatterns = [
    path("users/", include("app.internal.urls-paths.user_urls")),
    path("auth/", include("app.internal.urls-paths.auth_urls")),
    path("event/", include("app.internal.urls-paths.event_urls")),
    path("tg_users/", include("app.internal.urls-paths.tg_users_urls")),
    path("notofication/", include("app.internal.urls-paths.notification_urls")),
    path("image/", include("app.internal.urls-paths.image_urls")),
]
