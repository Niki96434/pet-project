export function formatDateForCalendar(date: string) {
    const [day, month, year] = date.split('.');
    const formatedDate = `${year}-${month}-${day}`;
    return formatedDate
}