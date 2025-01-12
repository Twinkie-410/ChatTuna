from telegram import Update, ReplyKeyboardMarkup, ReplyKeyboardRemove, constants
from telegram.ext import ContextTypes, CommandHandler, MessageHandler, filters, ConversationHandler, CallbackContext

from app.bot.services.event_service import get_all_events, get_event_by_user
from app.bot.services.user_service import get_or_create, get_user_by_id
from app.bot.utils.pretty import to_list_string_pretty, event_to_string_pretty

ASK_PERMISSION, MAIN_MENU, USER_EVENTS, ALL_EVENTS, BOT_SETTINGS, REGISTRATION, CANCEL_REGISTRATION = range(7)

permission_keyboard = [["Разрешить"]]
menu_keyboard = [["Ваши мероприятия", "Все мероприятия"], ["Настройки бота"]]
settings_keyboard = [["Я хочу получать рассылку", "Выйти"]]
user_events_info_keyboard = [["Посмотреть подробную информацию"], ["Назад"]]
user_events_cancel_keyboard = [["Отменить регистрацию"], ["Назад"]]
all_events_register_keyboard = [["Зарегистрироваться"], ["Назад"]]


async def start(update: Update, context: CallbackContext) -> int:
    await update.message.reply_text(
        "Здравствуйте! Разрешите использовать данные вашего аккаунта для работы бота",
        reply_markup=ReplyKeyboardMarkup(
            permission_keyboard, one_time_keyboard=True, resize_keyboard=True,
        ),
    )

    return ASK_PERMISSION


async def create_user(update: ContextTypes.DEFAULT_TYPE, context: CallbackContext):
    user, _ = await get_or_create(id=update.effective_user.id,
                                  first_name=update.effective_user.first_name,
                                  username=update.effective_user.username)

    await update.message.reply_text(text=f'Привет {user.first_name}, я **DEV** бот, если я сломаюсь - не страшно')


async def get_permission(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_response = update.message.text

    if user_response == 'Разрешить':
        await update.message.reply_text(
            "Спасибо!",
            reply_markup=ReplyKeyboardRemove(),
        )
        await create_user(update, context)

        await update.message.reply_text(
            "Выберите пункт меню",
            reply_markup=ReplyKeyboardMarkup(
                menu_keyboard, one_time_keyboard=True, resize_keyboard=True,
            ),
        )

        return MAIN_MENU

    await update.message.reply_text(
        "Разрешите использовать данные вашего аккаунта для работы бота",
        reply_markup=ReplyKeyboardMarkup(
            permission_keyboard, one_time_keyboard=True, resize_keyboard=True,
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
                              f'username: {user.username}', ])
    user_data_tg = '\n'.join([f'external_id: {update.effective_user.id}',
                              f'first_name: {update.effective_user.first_name}',
                              f'username: {update.effective_user.name}'])
    msg = 'Таким я тебя помню:\n' + user_data_db + '\n\n' + 'Такой ты сейчас\n' + user_data_tg
    await update.message.reply_text(text=msg)


async def main_menu(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_response = update.message.text

    match user_response:
        case "Ваши мероприятия":
            events = await get_event_by_user(update.effective_user.id)
            # todo метод для отправки сообщения с фото и без фото
            events_pretty = to_list_string_pretty(events)
            await update.message.reply_text(f"Список ваших мероприятий:\n{events_pretty}")
            await update.message.reply_text(
                "Выберите мероприятие по номеру для просмотра детальной информации",
                reply_markup=ReplyKeyboardMarkup(
                    [["Назад"]], one_time_keyboard=True, resize_keyboard=True,
                ),
            )
            return USER_EVENTS

        case "Все мероприятия":
            events = await get_all_events()
            events_pretty = to_list_string_pretty(events)
            await update.message.reply_text(f"Список всех мероприятий:\n{events_pretty}")
            await update.message.reply_text(
                "Выберите мероприятие по номеру для просмотра детальной информации",
                reply_markup=ReplyKeyboardMarkup(
                    [["Назад"]], one_time_keyboard=True, resize_keyboard=True,
                ),
            )

            return ALL_EVENTS

        case "Настройки бота":
            await update.message.reply_text(
                "Вы хотите получать рассылку?",
                reply_markup=ReplyKeyboardMarkup(
                    settings_keyboard, one_time_keyboard=True, resize_keyboard=True,
                ),
            )
            return BOT_SETTINGS
        case _:
            return MAIN_MENU


async def user_events(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_response = update.message.text

    if user_response == "Назад":
        await update.message.reply_text(
            "Выберите пункт меню",
            reply_markup=ReplyKeyboardMarkup(
                menu_keyboard, one_time_keyboard=True, resize_keyboard=True,
            ),
        )
        return MAIN_MENU

    events = await get_event_by_user(update.effective_user.id)
    try:
        select_num = int(user_response)
        if select_num <= 0:
            await update.message.reply_text(
                "Введите номер из списка мероприятий",
                reply_markup=ReplyKeyboardMarkup(
                    [["Назад"]], one_time_keyboard=True, resize_keyboard=True,
                ),
            )
            return USER_EVENTS
        event = events[select_num - 1]
    except (ValueError, IndexError):
        await update.message.reply_text(
            "Введите номер из списка мероприятий",
            reply_markup=ReplyKeyboardMarkup(
                [["Назад"]], one_time_keyboard=True, resize_keyboard=True,
            ),
        )
        return USER_EVENTS

    context.user_data["select_event"] = event
    await update.message.reply_text(event_to_string_pretty(event),
                                    parse_mode=constants.ParseMode.HTML)
    await update.message.reply_text(
        "Желаете отменить регистрацию?",
        reply_markup=ReplyKeyboardMarkup(
            user_events_cancel_keyboard, one_time_keyboard=True, resize_keyboard=True,
        ),
    )
    return CANCEL_REGISTRATION


async def user_events_cancel_registration(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_response = update.message.text

    if user_response == 'Отменить регистрацию':
        event = context.user_data.get('select_event')
        user = await get_user_by_id(update.effective_user.id)
        await event.users.aremove(user)
        await update.message.reply_text(
            f"Регистрация на **{event.name}** отменена",
            reply_markup=ReplyKeyboardRemove(),
        )

    await update.message.reply_text(
        "Выберите пункт меню",
        reply_markup=ReplyKeyboardMarkup(
            menu_keyboard, one_time_keyboard=True, resize_keyboard=True,
        ),
    )
    return MAIN_MENU


async def all_events(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_response = update.message.text

    if user_response == "Назад":
        return MAIN_MENU

    events = await get_all_events()
    try:
        select_num = int(user_response)
        if select_num <= 0:
            await update.message.reply_text(
                "Введите номер из списка мероприятий",
                reply_markup=ReplyKeyboardMarkup(
                    [["Назад"]], one_time_keyboard=True, resize_keyboard=True,
                ),
            )
            return ALL_EVENTS
        event = events[select_num - 1]
    except (ValueError, IndexError):
        await update.message.reply_text(
            "Введите номер из списка мероприятий",
            reply_markup=ReplyKeyboardMarkup(
                [["Назад"]], one_time_keyboard=True, resize_keyboard=True,
            ),
        )
        return ALL_EVENTS

    context.user_data["select_event"] = event
    await update.message.reply_text(event_to_string_pretty(event),
                                    parse_mode=constants.ParseMode.HTML)

    await update.message.reply_text(
        "Желаете зарегистрироваться на данное мероприятие?",
        reply_markup=ReplyKeyboardMarkup(
            all_events_register_keyboard, one_time_keyboard=True, resize_keyboard=True,
        ),
    )

    return REGISTRATION


async def registration(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_response = update.message.text

    if user_response == 'Зарегистрироваться':
        event = context.user_data.get('select_event')
        user = await get_user_by_id(update.effective_user.id)
        await event.users.aadd(user, through_defaults={'subscribe': True})
        await update.message.reply_text(
            f"Вы зарегистрировались на **{event.name}**",
            parse_mode=constants.ParseMode.MARKDOWN_V2,
            reply_markup=ReplyKeyboardRemove(),
        )

    await update.message.reply_text(
        "Выберите пункт меню",
        reply_markup=ReplyKeyboardMarkup(
            menu_keyboard, one_time_keyboard=True, resize_keyboard=True,
        ),
    )
    return MAIN_MENU


async def bot_settings(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_response = update.message.text

    if user_response == 'Я хочу получать рассылку':
        await update.message.reply_text(
            "Настройки изменены",
            reply_markup=ReplyKeyboardRemove(),
        )

    await update.message.reply_text(
        "Выберите пункт меню",
        reply_markup=ReplyKeyboardMarkup(
            menu_keyboard, one_time_keyboard=True, resize_keyboard=True,
        ),
    )

    return MAIN_MENU


# start_handler = CommandHandler('start', start)

personal_info_handler = CommandHandler('me', me)
echo_handler = MessageHandler(filters.TEXT & (~filters.COMMAND), echo)
help_handler = CommandHandler('help', help_command)
conversation_handler = ConversationHandler(
    entry_points=[CommandHandler("start", start)],
    states={
        ASK_PERMISSION: [MessageHandler(filters.TEXT & (~filters.COMMAND), get_permission)],
        MAIN_MENU: [MessageHandler(filters.TEXT & (~filters.COMMAND), main_menu)],
        USER_EVENTS: [MessageHandler(filters.TEXT & (~filters.COMMAND), user_events)],
        ALL_EVENTS: [MessageHandler(filters.TEXT & (~filters.COMMAND), all_events)],
        BOT_SETTINGS: [MessageHandler(filters.TEXT & (~filters.COMMAND), bot_settings)],
        REGISTRATION: [MessageHandler(filters.TEXT & (~filters.COMMAND), registration)],
        CANCEL_REGISTRATION: [MessageHandler(filters.TEXT & (~filters.COMMAND), user_events_cancel_registration)],
    },
    fallbacks=[CommandHandler('cancel', cancel)]
)
