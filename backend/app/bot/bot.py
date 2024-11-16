import logging
import os

import django
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import Application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")
django.setup()
from app.bot.handlers.user_handlers import start_handler, help_handler, echo_handler, personal_info_handler

load_dotenv()
TOKEN = os.getenv("TG_TOKEN")
# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
# set higher logging level for httpx to avoid all GET and POST requests being logged
logging.getLogger("httpx").setLevel(logging.WARNING)

logger = logging.getLogger(__name__)


def main() -> None:
    """Start the bot."""
    application = Application.builder().token(TOKEN).build()

    application.add_handler(start_handler)
    application.add_handler(help_handler)
    application.add_handler(personal_info_handler)

    application.add_handler(echo_handler)

    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
