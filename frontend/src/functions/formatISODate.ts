export function formatDateISO(isoDateString: string): string {
    // Преобразуем строку в объект Date
    const date = new Date(isoDateString);

    // Проверяем, была ли дата корректно распознана
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date string');
    }

    // Получаем смещение по времени в минутах
    const timezoneOffset = date.getTimezoneOffset();

    // Корректируем дату с учетом часового пояса
    const localDate = new Date(date.getTime() + (timezoneOffset - 300) * 60000);

    // Извлекаем компоненты даты и времени
    const day = String(localDate.getDate()).padStart(2, '0');
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); // месяцы начинаются с 0
    const year = localDate.getFullYear().toString();
    const hours = String(localDate.getHours()).padStart(2, '0');
    const minutes = String(localDate.getMinutes()).padStart(2, '0');

    // Форматируем окончательную строку
    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
    
    return formattedDate;
}