from telegram import Update, ReplyKeyboardMarkup, ReplyKeyboardRemove
from telegram.ext import ContextTypes, CommandHandler, MessageHandler, filters, ConversationHandler, CallbackContext

from app.bot.services.user_service import get_or_create, get_user_by_id

ASK_PERMISSION, CONTINUE_CONVERSATION = range(2)

async def start(update: Update, context: CallbackContext) -> int:
    await update.message.reply_text("Здравствуйте!")
    permission = await get_permission(update, context)
    return permission

async def create_user(update: ContextTypes.DEFAULT_TYPE, context: CallbackContext):
    user, _ = await get_or_create(id=update.effective_user.id,
                                  first_name=update.effective_user.first_name,
                                  username=update.effective_user.username,
                                  chat_id=update.effective_chat.id)

    await update.message.reply_text(text=f'Привет {user.first_name}, я **DEV** бот, если я сломаюсь - не страшно')

async def get_permission(update: Update, context: ContextTypes.DEFAULT_TYPE):
    reply_keyboard = [["Разрешить"]]
    user_response = update.message.text

    if user_response == 'Разрешить':
        await update.message.reply_text(
            "Спасибо!",
            reply_markup=ReplyKeyboardRemove(),
        )
        await create_user(update, context)

        return CONTINUE_CONVERSATION
     
    await update.message.reply_text(
        "Разрешите использовать данные вашего аккаунта для работы бота",
        reply_markup=ReplyKeyboardMarkup(
            reply_keyboard, one_time_keyboard=True, resize_keyboard=True, 
        ),
    )
    
    return ASK_PERMISSION  
    
def cancel(update: Update, context: CallbackContext) -> int:
    return ConversationHandler.END

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /help is issued."""
    await update.message.reply_text("Help!")


async def echo(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Echo the user message."""
    await update.message.reply_text(update.message.text)


async def me(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Get info about user"""
    user = await get_user_by_id(update.message.from_user.id)
    user_data_db = '\n'.join([f'external_id: {user.external_id}',
                              f'first_name: {user.first_name}',
                              f'username: {user.username}',
                              f'chat_id: {user.chat_id}'])
    user_data_tg = '\n'.join([f'external_id: {update.effective_user.id}',
                              f'first_name: {update.effective_user.first_name}',
                              f'username: {update.effective_user.name}',
                              f'chat_id: {update.effective_chat.id}'])
    msg = 'Таким я тебя помню:\n' + user_data_db + '\n\n' + 'Такой ты сейчас\n' + user_data_tg
    await update.message.reply_text(text=msg)


# start_handler = CommandHandler('start', start)
permission_handler = ConversationHandler(
        entry_points=[CommandHandler("start", start)],
        states={
            ASK_PERMISSION: [MessageHandler(filters.TEXT & (~filters.COMMAND), get_permission)],
            CONTINUE_CONVERSATION: [MessageHandler(filters.TEXT & (~filters.COMMAND), echo)],
        },
        fallbacks=[CommandHandler('cancel', cancel)]
    )
personal_info_handler = CommandHandler('me', me)
echo_handler = MessageHandler(filters.TEXT & (~filters.COMMAND), echo)
help_handler = CommandHandler('help', help_command)
