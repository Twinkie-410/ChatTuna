export function formatDateToISO(dateString: Date): string {
    // Преобразуем строку в объект Date
    const date = new Date(dateString);

    // Проверяем, была ли дата корректно распознана
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date string');
    }

    // Форматируем компоненты даты и времени
    const year = date.getFullYear().toString();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы начинаются с 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Получаем смещение часового пояса
    const timezoneOffset = -date.getTimezoneOffset();
    const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
    const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
    const timezoneSign = timezoneOffset >= 0 ? '+' : '-';

    // Собираем строку в формате ISO 8601
    const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneSign}${offsetHours}:${offsetMinutes}`;

    return isoString;
}
