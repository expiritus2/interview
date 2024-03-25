const { findLUSlength } = require('./index4');

describe('test', () => {
  it('test2', () => {
    // expect(findLUSlength(["aba", "cdc", "eae"])).toEqual(3); // Output: 3
    // expect(findLUSlength(["aaa", "aaa", "aa"])).toEqual(-1); // Output: -1
    expect(findLUSlength(["aaa","acb"])).toEqual(3); // Output: -1
  })
});
