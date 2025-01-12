import telegram
from telegram import Update, constants

from app.bot.services.image_service import get_image_by_event
from app.bot.utils.pretty import event_to_string_pretty
from app.internal.models.event_model import Event


async def send_message(user_id, msg):
    from dotenv import load_dotenv
    import os
    load_dotenv()
    TOKEN = os.getenv("TG_TOKEN")
    await telegram.Bot(TOKEN).sendMessage(chat_id=user_id, text=msg, parse_mode="HTML")


async def reply_event(update: Update, event: Event):
    image_object = await get_image_by_event(event)
    if image_object:
        image = image_object.image
        return await update.message.reply_photo(photo=image,
                                                caption=event_to_string_pretty(event),
                                                parse_mode=constants.ParseMode.HTML)
    else:
        return await update.message.reply_text(text=event_to_string_pretty(event),
                                               parse_mode=constants.ParseMode.HTML)
