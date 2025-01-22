from django.db.models import Model

from app.internal.models.event_model import Event
from babel.dates import format_date, format_datetime, format_time

def to_list_string_pretty(list_object: list[Model]):
    return ''.join([f"{i + 1}. {obj.name}\n" for i, obj in enumerate(list_object)])


async def event_to_string_pretty(event: Event):
    return fr"""
<b>{event.name.upper()}</b>
{event.description}
     
Дата начала: {format_datetime(event.datetime_start, "EEEE, dd MMMM, HH:mm", locale="ru")}
Дата окончания: {format_datetime(event.datetime_end, "EEEE, dd MMMM, HH:mm", locale="ru")}
Место: {event.address}
Осталось свободных мест {await event.free_places}

Организаторы: {event.organizer}
Контакты для связи: {event.contacts}
    """
