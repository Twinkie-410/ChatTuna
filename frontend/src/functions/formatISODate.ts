export function formatDateISO(isoDateString: string): string {
    // Преобразуем строку в объект Date
    const date = new Date(isoDateString);

    // Проверяем, была ли дата корректно распознана
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date string');
    }

    // Извлекаем компоненты даты и времени
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы начинаются с 0
    const year = date.getFullYear().toString();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Форматируем окончательную строку
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    
    return formattedDate;
}