
import {hide, hidingSymbol} from "./sensitive"


test("String must be replaced by hiding symbol with appropriate length", () => {

    const testSecret = "123456aa";
    const expectedHidden = hidingSymbol.repeat(testSecret.length);

    expect(hide(testSecret)).toEqual(expectedHidden)
})