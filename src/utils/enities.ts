
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

export interface EntityWithState {
    status?: {
        state?: string;
    };
}

export function isEntityCompleted(entity: EntityWithState): boolean {
    const currentState = entity.status?.state;

    return currentState === 'succeeded' || currentState === 'failed';
}

/**
 * Deep copy of an entity
 * @param entity
 */
export function deepCopy<T>(entity: T): T {
    // TODO: consider to replace implementation
    return JSON.parse(JSON.stringify(entity));
}
