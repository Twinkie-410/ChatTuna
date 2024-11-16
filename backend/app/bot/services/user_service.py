from app.internal.models.tg_user import TGUser


async def get_user_by_id(id):
    return await TGUser.objects.filter(external_id=id).afirst()


async def create_user(id, username, chat_id, first_name=''):
    return await TGUser.objects.acreate(exteranl_id=id,
                                        first_name=first_name,
                                        username=username,
                                        chat_id=chat_id)


async def get_or_create(id, first_name, username, chat_id):
    return await TGUser.objects.aget_or_create(external_id=id,
                                               defaults={
                                                   'first_name': first_name,
                                                   'username': username,
                                                   'chat_id': chat_id})
