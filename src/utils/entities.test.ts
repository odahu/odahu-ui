import {
    addSuffixToID,
    deepCopy,
    ID_MAX_LENGTH,
    isValidID,
    isValidLabel,
    LABEL_MAX_LENGTH,
    merge,
    normalize
} from "./enities";
import {ModelTrainingSpec} from "../models/odahuflow/ModelTrainingSpec";

test('normalize empty list', () => {
    expect(Object.keys(normalize([]))).toHaveLength(0);
});

test('normalize', () => {
    const result = normalize([
        {id: "abc"}, {id: "def"}
    ]);

    expect(Object.keys(result)).toHaveLength(2);
    expect(result.abc.id).toBe("abc");
    expect(result.def.id).toBe("def");
});

test('deep copy of an entity', () => {
    const originalEntity = {a: {b: {c: 1}}};
    const copiedEntity = deepCopy(originalEntity);

    expect(originalEntity).toEqual(copiedEntity);

    originalEntity.a.b.c = 2;
    expect(originalEntity).not.toEqual(copiedEntity);
});

test('Valid ID', () => {
    expect(isValidID('test-conn-id')).toBeTruthy();
});

test('If ID contains 1 symbol than it is valid', () => {
    expect(isValidID('t')).toBeTruthy();
});

test('If ID starts with "-" than it is not valid', () => {
    expect(isValidID('-id')).toBeFalsy();
});

test('If ID ends with "-" than it is not valid', () => {
    expect(isValidID('id-')).toBeFalsy();
});

test('Empty ID is not valid', () => {
    expect(isValidID('')).toBeFalsy();
});

test(`If ID contains more ${ID_MAX_LENGTH} symbols, than it is not valid`, () => {
    expect(isValidID('s'.repeat(ID_MAX_LENGTH + 1))).toBeFalsy();
});

test('If ID contains upper symbols, than it is not valid', () => {
    expect(isValidID('sdsSSSSsss')).toBeFalsy();
});

test('If ID is undefined, than it is not valid', () => {
    expect(isValidID(undefined)).toBeFalsy();
});

test('add suffix to id', () => {
    expect(addSuffixToID('test', '-suffix')).toEqual("test-suffix");
});

test('suffix exceed the max length of ID', () => {
    expect(() => {
        addSuffixToID('test', 's'.repeat(ID_MAX_LENGTH + 1))
    }).toThrow(`Suffix length exceed the max length of the ID`);
});

test('valid label', () => {
    expect(isValidLabel('test-1.2')).toBeTruthy();
});

test('begin with dot', () => {
    expect(isValidLabel('.test-1.2')).toBeFalsy();
});

test('end with dot', () => {
    expect(isValidLabel('test-1.2.')).toBeFalsy();
});

test('begin with dash', () => {
    expect(isValidLabel('-test-1.2')).toBeFalsy();
});

test('end with dash', () => {
    expect(isValidLabel('test-1.2-')).toBeFalsy();
});

test('capital letters', () => {
    expect(isValidLabel('TEST-1.2')).toBeTruthy();
});

test('max length exceeds', () => {
    expect(isValidLabel('s'.repeat(LABEL_MAX_LENGTH + 1))).toBeFalsy();
});

test('min length', () => {
    expect(isValidLabel('s')).toBeTruthy();
});

test('merge one element', () => {
    const mt: ModelTrainingSpec = {
        entrypoint: "main",
        image: "image:123",
        resources: {
            limits: {
                cpu: "1", gpu: "2", memory: "33"
            }
        }
    }

    expect(merge(mt)).toEqual(mt)
});

test('merge two elements', () => {
    const mt1: ModelTrainingSpec = {
        entrypoint: "main",
        image: "image:123",
        resources: {
            limits: {
                cpu: "1",
                gpu: "2",
                memory: "33"
            }
        }
    }

    const mt2: ModelTrainingSpec = {
        entrypoint: "new_entrypoint",
        resources: {
            limits: {
                gpu: "new_gpu"
            }
        }
    };

    expect(merge(mt1, mt2)).toEqual({
        entrypoint: "new_entrypoint",
        image: "image:123",
        resources: {
            limits: {
                cpu: "1", gpu: "new_gpu", memory: "33"
            }
        }
    })
});

test('merge three elements', () => {
    const mt1: ModelTrainingSpec = {
        entrypoint: "main",
        image: "image:123",
        vcsName: "vcs",
        resources: {
            limits: {
                cpu: "1", gpu: "2", memory: "33"
            }
        }
    }

    const mt2: ModelTrainingSpec = {
        entrypoint: "new_entrypoint",
        resources: {
            limits: {
                gpu: "new_gpu"
            }
        }
    };

    const mt3: ModelTrainingSpec = {
        image: "new_image",
        resources: {
            limits: {
                cpu: "new_cpu"
            }
        }
    };

    expect(merge(mt1, mt2, mt3)).toEqual({
        entrypoint: "new_entrypoint",
        image: "new_image",
        vcsName: "vcs",
        resources: {
            limits: {
                cpu: "new_cpu", gpu: "new_gpu", memory: "33"
            }
        }
    })
});
