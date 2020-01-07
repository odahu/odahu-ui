
export interface Entity {
    id?: string;
}

export function normalize<T extends Entity>(entities: T[]): Record<string, T> {
    const result: Record<string, T> = {};

    for (const entity of entities) {
        const id = entity.id ?? "";

        result[id] = entity
    }

    return result;
}
