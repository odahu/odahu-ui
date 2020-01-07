import {normalize} from "./enities";

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
