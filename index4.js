// ["aba", "cdc", "eae"]
// ["aaa", "aaa", "aa"]
// ["aaa","acb"]

const findLUSlength = function(strs) {
  function isSubsequence(s1, s2) {
    let i = 0;
    for (let j = 0; i < s1.length && j < s2.length; j++) {
      const char1 = s1.charAt(i);
      const char2 = s2.charAt(j)
      if (char1 === char2) {
        i++;
      }
    }
    return i === s1.length;
  }

  strs.sort((a, b) => b.length - a.length);

  for (let i = 0; i < strs.length; i++) {
    let isLUS = true;
    for (let j = 0; j < strs.length; j++) {
      if (i !== j && isSubsequence(strs[i], strs[j])) {
        isLUS = false;
        break;
      }
    }
    if (isLUS) {
      return strs[i].length;
    }
  }

  return -1;
};

// class Solution {
//   findLUSlength(strs) {
//     const joinedStrs = strs.join('');
//     const map = {};
//
//     for (const str of strs) {
//       const regExp = new RegExp(str, 'g');
//       const match = joinedStrs.match(regExp);
//
//       if (match) {
//         map[str] = match.length;
//       }
//     }
//
//     const result = Object.values(map).reduce((acc, cur) => {
//       if (cur === 1) {
//         return acc + 1;
//       }
//
//       return acc;
//     }, 0);
//
//     return result || -1;
//   }
// }

module.exports = { findLUSlength };
