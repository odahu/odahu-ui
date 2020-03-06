

const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
};

/**
 * Format ISO 8601 date string to date string in browser locale
 * @param isoDate ISO 8601 date string
 */

export function humanDate(isoDate: string | undefined): string {
    if (isoDate === undefined){
        return ""
    }
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, options);
}