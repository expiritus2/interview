const {
  reverse,
  canGetCount,
  countSymbols,
  getRandomHexColor,
  cache,
  isPalindrome,
  testFn,
  compose,
  flatten,
  atm,
  isVertSym,
  allSentences,
  getRoute,
  findPath,
  convertToIntervalString,
  LikesCounter,
  minCostPainting
} = require('./index');

describe('reverse', () => {
  it('should reverse array with even array elements', () => {
    const arr = [1, 2, 3, 3444];
    const result = reverse(arr);
    const copyArr = JSON.parse(JSON.stringify(arr));
    const reversedArr = copyArr.reverse();

    expect(result).toEqual(reversedArr);
  });

  it('should reverse array with odd array elements', () => {
    const arr = [1, 2, 3, 4, 3444];
    const result = reverse(arr);
    const copyArr = JSON.parse(JSON.stringify(arr));
    const reversedArr = copyArr.reverse();

    expect(result).toEqual(reversedArr);
  });
});

describe('canGetOne', () => {
  it('should return yes on first N', () => {
    const getOne = canGetCount(2);

    expect(getOne()).toEqual('yes');
    expect(getOne()).toEqual('yes');
    expect(getOne()).toEqual('no');
  });
});

describe('countSymbols', () => {
  it('should count max symbols', () => {
    const str1 = '';
    const str2 = 'a';
    const str3 = 'abbc';
    const str4 = 'adddaabaa';

    expect(countSymbols(str1)).toEqual({ char: '', max: 0 });
    expect(countSymbols(str2)).toEqual({ char: 'a', max: 1 });
    expect(countSymbols(str3)).toEqual({ char: 'b', max: 2 });
    expect(countSymbols(str4)).toEqual({ char: 'd', max: 3 });
  });
});

describe('getRandomHexColor', () => {
  it('test', () => {
    const result = getRandomHexColor();

    expect(result.length).toEqual(7);
  });
});

describe('cache', () => {
  it('test cache', async () => {
    function getData() {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('this');
          resolve(42);
        }, 1000);
      });
    }

    const newGet = cache(getData, 5000);
    const result1 = await newGet();
    const result2 = await newGet();
  });
});

/*
* - Казак
* - А роза упала на лапу Азора
* - Do geese see God?
* - Madam, I'm Adam
* */

describe('isPalindrome', () => {
  it('test case 1', () => {
    expect(isPalindrome('Казак')).toBeTruthy();
  });

  it('test case 2', () => {
    expect(isPalindrome('А роза упала на лапу Азора')).toBeTruthy();
  });

  it('test case 3', () => {
    expect(isPalindrome('Do geese see God?')).toBeTruthy();
  });

  it('test case 4', () => {
    expect(isPalindrome('Madam, I\'m Adam')).toBeTruthy();
  });
});

describe('testFn', () => {
  it('test case 1', () => {
    const result = testFn([2, 3, 7, 4, 6, 1, 5, 8, 9]);
    expect(result).toEqual([2, 1, 3, 4, 6, 5, 7, 8, 9]);
  });
});

describe('compose', () => {
  it('test case 1', () => {
    const square = (x) => x * x;
    const times2 = (x) => x * 2;
    const sum = (a, b) => a + b;

    expect(compose(square, times2)(2)).toEqual(square(times2(2)));
    expect(compose(square, times2, sum)(3, 4)).toEqual(square(times2(sum(3, 4))));
  });
});

describe('flatten', () => {
  it('test case 1', () => {
    const input = JSON.parse(JSON.stringify([1, 'any [complex] string', null, function() {
    }, [1, 2, [3, '4'], 0], [], { a: 1 }]));
    const output = JSON.parse(JSON.stringify([1, 'any [complex] string', null, function() {
    }, 1, 2, 3, '4', 0, { a: 1 }]));

    expect(flatten(input)).toEqual(output);
  });
});

describe('atm', () => {
  it('test case 1', () => {
    const limits = [[1000, 6], [500, 5], [100, 5], [50, 1]]; // нужно выбрать любой удобный формат

    expect(atm(1250, limits)).toEqual('1x1000 2x100 1x50'); // '1x1000 2x100 1x50'
  });

  it('test case 2', () => {
    const limits = [[1000, 6], [100, 5], [50, 1]]; // нужно выбрать любой удобный формат

    expect(atm(1000000, limits)).toEqual('Error: Not enough money'); // 'Error: Not enough money'
  });

  it('test case 3', () => {
    const limits = [[1000, 6], [100, 5], [50, 1]]; // нужно выбрать любой удобный формат

    expect(atm(2400, limits)).toEqual('2x1000 4x100'); // '2x1000 4x100'
  });

  it('test case 4', () => {
    const limits = [[1000, 6], [100, 5], [50, 1]]; // нужно выбрать любой удобный формат

    expect(atm(6512, limits)).toEqual('Error: Incorrect value'); // 'Error: Incorrect value'
  });
});

describe('isVertSym', () => {
  it('test case 1', () => {
    const input = [
      [0, 0],
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 1],
      [4, 0],
      [4, 0],
    ];
    const result = isVertSym(input); // true
    expect(result).toBeTruthy();
  });

  it('test case 2', () => {
    const input = [
      [0, 0],
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 1],
      [4, 0],
    ];
    const result = isVertSym(input); // false
    expect(result).toBeFalsy();
  });

  it('test case 3', () => {
    const input = [];
    const result = isVertSym(input); // true
    expect(result).toBeTruthy();
  });

  it('test case 4', () => {
    const input = [
      [0, 0],
    ];
    const result = isVertSym(input); // true
    expect(result).toBeTruthy();
  });

  it('test case 5', () => {
    const input = [
      [0, 0],
      [10, 0],
    ];

    const result = isVertSym(input); // true
    expect(result).toBeTruthy();
  });

  it('test case 6', () => {
    const input = [
      [0, 0],
      [11, 1],
    ];
    const result = isVertSym(input); // false
    expect(result).toBeFalsy();
  });

  it('test case 1', () => {
    const input = [
      [0, 0],
      [1, 0],
      [3, 0],
    ];
    const result = isVertSym(input); // false
    expect(result).toBeFalsy();
  });
});

describe('allSentences', () => {
  it('test case 1', () => {
    const nextSentence = allSentences([
      ['внучка', 'внучок'],
      ['маша', 'махать', 'машу'],
      // ... тут могут быть другие слова с любым количеством своих форм
    ]);
    expect(nextSentence()).toEqual('внучка маша'); // 'внучка маша'
    expect(nextSentence()).toEqual('внучка махать'); // 'внучка махать'
    expect(nextSentence()).toBeUndefined(); // undefined
  });
});

describe('getRoute', () => {
  it('test case 1', () => {
    const tickets = [
      { from: 'London', to: 'Moscow' },
      { from: 'NY', to: 'London' },
      { from: 'Moscow', to: 'SPb' },
    ];
    const result = getRoute(tickets);
    expect(result).toEqual([
      { from: 'NY', to: 'London' },
      { from: 'London', to: 'Moscow' },
      { from: 'Moscow', to: 'SPb' },
    ]);
  });
});

describe('findPath', () => {
  const graph = { A: ['B', 'D'], B: ['C', 'N', 'Z'], D: ['E', 'F'], F: ['S'] };

  async function fetchFlights(from) {
    return graph[from];
  }

  it('case 1', async () => {
    const result = await findPath('A', 'N', fetchFlights); // Promise.resolve(['A', 'B', 'N']);)
    expect(result).toEqual(['A', 'B', 'N']);
  });

  it('case 2', async () => {
    const result = await findPath('A', 'S', fetchFlights); // Promise.resolve(['A', 'D', 'F', 'S']);)
    expect(result).toEqual(['A', 'D', 'F', 'S']);
  });

  it('case 3', async () => {
    const result = await findPath('B', 'S', fetchFlights); // Promise.reject(new Error('No way');)
    expect(result).toEqual('No way');
  });
});

describe('convertToIntervalString', () => {
  it('test case 1', () => {
    const input = [2, 3, 5, 6, 7, 8, 9, 11, 20, 21, 22];
    expect(convertToIntervalString(input)).toEqual('2-3,5-9,11,20-22');
  });
});

describe('LikesCounter', () => {
  it('test case 1', () => {
    const likesCounter = new LikesCounter();
    likesCounter.like(1);
    likesCounter.like(2);
    likesCounter.like(1);
    likesCounter.like(3);
    likesCounter.like(2);
    likesCounter.like(2);

    expect(likesCounter.getMax()).toEqual(3); // Выведет: 3
  });
});

describe('minCostPainting', () => {
  it('test case 1', () => {
    // Пример использования
    const houses = [
      [1, 2, 3],
      [1, 3, 2],
      [3, 1, 2]
    ];
    expect(minCostPainting(houses)).toEqual(4); // Выведет: 4
  })
})
