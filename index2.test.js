const { solution } = require('./index2');

describe('solution', () => {
  it('should return 3', () => {
    const result1 = solution([10, 1, 3, 1, 2, 2, 1, 0, 4]); // 3
    expect(result1).toEqual(3);
  });

  it('should return 1', () => {
    const result2 = solution([5, 3, 1, 3, 2, 3]); // 1
    expect(result2).toEqual(1);
  });

  it('should return 2', () => {
    const result3 = solution([9, 9, 9, 9, 9]); // 2
    expect(result3).toEqual(2);
  });


  it('should return 3', () => {
    const result4 = solution([1, 5, 2, 4, 3, 3]); // 3
    expect(result4).toEqual(3);
  });
});
