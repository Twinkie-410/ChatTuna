from django.db.models import Model

from app.internal.models.event_model import Event


def to_list_string_pretty(list_object: list[Model]):
    return ''.join([f"{i + 1}. {obj.name}\n" for i, obj in enumerate(list_object)])


def event_to_string_pretty(event: Event):
    return fr"""
<b>{event.name.upper()}</b>
{event.description}
     
Дата начала: {event.datetime_start}
Дата окончания: {event.datetime_end}
Место: {event.address}
Осталось свободных мест {event.free_places}

Организаторы: {event.organizer}
Контакты для связи: {event.contacts}
    """
