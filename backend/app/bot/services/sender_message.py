import asyncio
import os

import django
import telegram
from dotenv import load_dotenv

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")
django.setup()
from app.bot.services.user_service import get_user_by_id

load_dotenv()
TOKEN = os.getenv("TG_TOKEN")


async def send(chat, msg):
    await telegram.Bot(TOKEN).sendMessage(chat_id=chat, text=msg)


if __name__ == '__main__':
    id = -1
    user = asyncio.run(get_user_by_id(id))
    msg = f'а я тебя нашёл, {user.first_name}. Представь, что я только что прислал тебе уведомление о предстоящем мероприятии :)'
    asyncio.run(send(id, msg))
