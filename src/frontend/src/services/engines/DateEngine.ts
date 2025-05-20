/**
 * Format a date object in a standardized manner and return that string.
 * @param date The original date to format.
 * @returns The stringified, formatted date.
 */
export function FormatDate(date?: Date) {
    if(!date) return "";

    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return formattedDate;
}