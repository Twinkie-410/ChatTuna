import datetime
from functools import lru_cache

from app.internal.models.event_model import Event
from app.internal.models.registration_event_model import RegistrationEvent
from app.internal.models.activity_model import Activity
from app.internal.models.registration_activity_model import RegistrationActivity


# todo кэш есть, а если найду? - кеш добавить надо в идеале
async def get_all_events():
    return [event async for event in Event.objects.filter(datetime_start__gte=datetime.datetime.now()).all()]


async def get_event_by_user(user_id):
    return [event async for event in Event.objects.filter(
        users__external_id=user_id,
        datetime_end__gte=datetime.datetime.now()
    ).all()]


async def get_event_by_id(id):
    return await Event.objects.filter(id=id).afirst()


async def get_all_activity():
    return [activity async for activity in Activity.objects.filter(datetime_start__gte=datetime.datetime.now()).all()]
