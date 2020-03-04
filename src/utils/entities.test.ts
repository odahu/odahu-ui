import {addSuffixToID, deepCopy, ID_MAX_LENGTH, isValidID, normalize} from "./enities";

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
