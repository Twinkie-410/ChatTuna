from asgiref.sync import sync_to_async

from app.internal.models.event_model import Event


async def get_image_by_event(event: Event):
    return await sync_to_async(lambda: event.image)()
