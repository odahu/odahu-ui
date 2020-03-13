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

export function isEntityScheduling(entity: EntityWithState): boolean {
    return entity.status?.state === "scheduling";
}

/**
 * Deep copy of an entity
 * @param entity
 */
export function deepCopy<T>(entity: T): T {
    // TODO: consider to replace implementation
    return JSON.parse(JSON.stringify(entity));
}

const ID_REGEX = /^(?!-)[a-z0-9-]{1,63}(?<!-)$/;
export const ID_MAX_LENGTH = 63;

/**
 * Id restrictions:
 *   * contain at most 63 characters
 *   * contain only lowercase alphanumeric characters or ‘-’
 *   * start with an alphanumeric character
 *   * end with an alphanumeric character
 * @param id for validation
 */
export function isValidID(id: string | undefined): boolean {
    return id !== undefined && ID_REGEX.test(id);
}

/**
 * Add the suffix to the ID. If new length exceed the max length of ID than the it will be truncated.
 * @param id
 * @param suffix
 * @return new id
 */
export function addSuffixToID(id: string, suffix: string): string {
    if (suffix.length > ID_MAX_LENGTH) {
        throw new Error(`Suffix length exceed the max length of the ID`)
    }

    return id.substr(0, ID_MAX_LENGTH - suffix.length) + suffix
}
