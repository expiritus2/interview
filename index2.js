function solution(A) {
  let map = {};

  for (let i = 1; i < A.length; i++) {
    let sum = A[i - 1] + A[i];
    if (map[sum]) {
      if (map[sum].i === i - 1) {
        continue;
      }

      map[sum] = { count: map[sum].count + 1, i };
    } else {
      map[sum] = { count: 1, i };
    }
  }

  const values = Object.values(map);
  return Math.max(...values.map(({ count }) => count));
}

module.exports = {
  solution,
};

