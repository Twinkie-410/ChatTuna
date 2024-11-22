from app.internal.models.tg_user_model import TGUser


async def get_user_by_id(id):
    return await TGUser.objects.filter(external_id=id).afirst()


async def create_user(id, username, age=0, first_name=''):
    return await TGUser.objects.acreate(exteranl_id=id,
                                        first_name=first_name,
                                        username=username,
                                        age=age)


async def get_or_create(id, first_name, username, age=0):
    return await TGUser.objects.aget_or_create(external_id=id,
                                               defaults={
                                                   'first_name': first_name,
                                                   'username': username,
                                                   'age': age})
