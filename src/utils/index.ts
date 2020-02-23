/**
 * If the array is not empty then retrieve the first element.
 * Otherwise the function returns a default value.
 */
export function extractZeroElement<T>(array: Array<T>, defaultValue: T): T {
    return array.length > 0 ? array[0] : defaultValue;
}

/**
 * If the array is not empty then retrieve the last element.
 * Otherwise the function returns a default value.
 */
export function extractLastElement<T>(array: Array<T>, defaultValue: T): T {
    return array.length > 0 ? array[array.length - 1] : defaultValue;
}
