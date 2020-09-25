

export const hidingSymbol = "•"

export function hide(plainString = ""): string {
    return hidingSymbol.repeat(plainString.length)
}