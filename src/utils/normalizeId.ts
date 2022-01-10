export const normalizeId = (string: string | undefined, prefix = 'Btn'): string  => {
    if (!string) {
        return `${Math.random().toString().substring(2,5)}-Btn`
    }
    string = string.replace(/ /g, "-")
    return `${string}-${prefix}`
}