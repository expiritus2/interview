// [1, 2, 3, 3444] => [3444, 3, 2, 1]

function reverse(array) {
  const copyArr = JSON.parse(JSON.stringify(array));
  let buf;

  for (let i = 0; i < copyArr.length / 2; i++) {
    const endIndex = array.length - 1 - i;
    buf = copyArr[i];
    copyArr[i] = copyArr[endIndex];
    copyArr[endIndex] = buf;
  }

  return copyArr;
}

function canGetCount(count) {
  let number = count;
  return function() {
    if (number > 0) {
      number--;
      return 'yes';
    } else {
      return 'no';
    }
  };
}

// 1) "" -> 0
// 2) "a" -> 1
// 3) "abbc" -> 2
// 4) "adddaabaa" -> 3


const countSymbols = (str) => {
  let currentChar;
  let currentCount = 0;
  let max = 0;

  for (let i = 0; i < str.length; i++) {
    if (currentChar === str.charAt(i)) {
      currentCount++;
    } else {
      if (max < currentCount) {
        max = currentCount;
      }

      currentChar = str.charAt(i);
      currentCount = 1;
    }
  }

  if (max < currentCount) {
    max = currentCount;
  }

  return max;
};

function getRandomHexColor() {
  let random = Math.floor(Math.random() * (256 * 256 * 256));
  return '#' + random.toString(16);
}

// Написать кеширующую функцию со следующим поведением:
// Если getData еще не вызывалась, вызвать и закешировать результат;
// Если вызывалась недавно, то вернуть сохраненный результат;
// Если вызывалась давно, заново сходить за данными.

function getData() {
  return new Promise(resolve => {
    setTimeout(() => resolve(42), 1000);
  });
}

//
// const newGet = cache(getData, 5000);
// newGet();


// Написать кеширующую функцию со следующим поведением:
// Если getData еще не вызывалась, вызвать и закешировать результат;
// Если вызывалась недавно, то вернуть сохраненный результат;
// Если вызывалась давно, заново сходить за данными.

// function cache(getData, ts) {
//   let lastCall;
//   let cache;
//
//   return async () => {
//     if (!lastCall || Date.now() - lastCall >= ts) {
//       cache = await getData();
//       lastCall = Date.now();
//     }
//
//     return cache;
//   };
// }

function cache(getData, ts) {
  let lastCall;
  let dataPromise;

  return async () => {
    if (!lastCall || Date.now() - lastCall >= ts) {
      dataPromise = getData;
      lastCall = Date.now();
    }

    return dataPromise;
  };
}

function throttle(fn, timeout) {
  let inThrottle = false;

  return (...args) => {
    const context = this;

    if (!inThrottle) {
      fn.apply(context, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, timeout);
    }
  };
}

function debounce(fn, timeout) {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    setTimeout(() => {
      fn.apply(this, args);
    }, timeout);
  };
}

/*
* - Казак
* - А роза упала на лапу Азора
* - Do geese see God?
* - Madam, I'm Adam
* */

function isEqual(s1, s2) {
  return s1.toLowerCase() === s2.toLowerCase();
}

function isLetter(s1) {
  return s1.toLowerCase() === s1.toUpperCase();
}

function isPalindrome(str) {
  let start = 0;
  let end = 0;

  while (start < end) {
    const firstChar = str[start];
    const endChar = str[end];

    if (!isLetter(firstChar)) {
      start += 1;
      continue;
    }

    if (!isLetter(endChar)) {
      end -= 1;
      continue;
    }

    if (!isEqual(firstChar, endChar)) {
      return false;
    }


    start += 1;
    end -= 1;
  }

  return true;
}

function testFn(array) {
  const buf = array.filter((value) => value % 2 === 1).sort((a, b) => a - b);
  let bufIndex = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 === 1) {
      array[i] = buf[bufIndex];
      bufIndex++;
    }
  }

  return array;
}

function compose(...functionArray) {
  return function(...args) {
    return functionArray.reduceRight((acc, val) => {
      return [val.apply(this, acc)];
    }, args)[0];
  };
}

// var func2 = bind(func11, this, args);
// func2();

function bind(func, ctx, ...args) {
  return function(...newArgs) {
    return func.apply(ctx, [...args, ...newArgs]);
  };
}

/**
 * flatten.
 *
 * Дан массив, в котором могут храниться любые типы данных.
 * Нужно реализовать функцию, которая разворачивает вложенные массивы в исходный массив.
 * Данные остальных типов должны остаться без изменений.
 * Решение должно учитывать любую вложенность элементов (т.е. не должно содержать рекурсивные вызовы).
 */

// flatten([1, 'any [complex] string', null, function() {}, [1, 2, [3, '4'], 0], [], { a: 1 }]);
// возвращает
//      [1, 'any [complex] string', null, function() {}, 1, 2, 3, '4', 0, { a: 1 }]

function flatten(list) {
  const result = [];
  const stack = [];
  let current = { array: list, index: 0 };

  while (current) {
    const { array, index } = current;
    current.index++;

    if (index < array.length) {
      if (Array.isArray(array[index])) {
        stack.push(current);
        current = { array: array[index], index: 0 };
      } else {
        result.push(array[index]);
      }
    } else {
      current = stack.pop();
    }
  }

  return result;
}

/**
 * Банкомат.
 *
 * В банкомате есть купюры - 50, 100, 500, 1000, 5000 руб. Номиналы купюр только такие, они не меняются.
 * Есть ограничение на количество каждой из купюр (limits), его нужно держать в актуальном состоянии
 * Нужно вернуть купюры и их количество, которыми можно выдать запрашиваемую сумму,
 * в виде строки указанного формата. Начинать с самой крупной.
 * Если выдать запрашиваемую сумму не получается, вернуть ошибку.
 */

// limits = [[1000, 6], [100, 5], [50, 1]]


function atm(sum, limit) {
  const sortedLimit = limit.sort((a, b) => b[0] - a[0]);
  const smallestBanknote = sortedLimit[sortedLimit.length - 1][0];
  const result = [];

  if (sum % smallestBanknote !== 0) {
    return 'Error: Incorrect value';
  }

  sortedLimit.forEach((limit) => {
    const [banknote, amount] = limit;
    const max = Math.floor(sum / banknote);
    const currentAmount = max > amount ? amount : max;
    sum -= currentAmount * banknote;
    result.push([currentAmount, banknote]);
  });

  if (sum === 0) {
    result.forEach((res) => {
      sortedLimit[1] -= res[0];
    });

    return result.filter((val) => val[0]).map((val) => val.join('x')).join(' ');
  } else {
    return 'Error: Not enough money';
  }
}

/**
 * Дан массив точек с целочисленными координатами (x, y).
 * Определить, существует ли вертикальная прямая,
 * делящая точки на 2 симметричных относительно этой прямой множества.
 * Note: Для удобства точку можно представлять не как массив [x, y], а как объект {x, y}
 */

// [
//   [0, 0],
//   [10, 0],
// ]

function isVertSym(list) {
  const cache = {};
  let minX = Math.min();
  let maxX = Math.max();
  list.forEach(point => {
    minX = Math.min(minX, point[0]);
    maxX = Math.max(maxX, point[0]);
    const key = point.join(',');
    if (cache[key] === undefined) {
      cache[key] = 0;
    }
    cache[key]++;
  });
  const centerX = (minX + maxX) / 2;
  return list.every(point => {
    let simX = point[0] > centerX ? centerX - (point[0] - centerX) : centerX + (centerX - point[0]);
    simX = minX - point[0] + maxX;
    let simY = point[1];
    const key = [simX, simY].join(',');
    if (cache[key]) {
      cache[key]--;
      return true;
    } else {
      return false;
    }
  });
}

//Дан список слов.
//Каждое слово представлено массивом возможных вариантов нормализации.
//Написать функцию, которая принимает список слов и возвращает функцию,
//которая при каждом вызове возвращает строку -
//одно из возможных сочетаний вариантов слова в предложении.
//Пока не вернёт все возможные варианты.
//Нужна реализация без итераторов.
//Ни список слов, ни варианты нормализации не будут пустыми.
//Внучку –> ['внучка', 'внучок', ...]
//Машу –> ['маша', 'махать', 'машу', ...]
//...

// ['внучка', 'внучок'],
//   ['маша', 'махать', 'машу']
function allSentences(aoa) {
  const stack = aoa.map(x => 0);

  return () => {
    if (stack.length === 0 || stack[0] === aoa[0].length) {
      return;
    }
    const combination = stack.map((elem, index) => (aoa[index][elem])).join(' ');
    let aoaIndex = stack.length - 1;
    while (stack[aoaIndex] === aoa[aoaIndex].length) {
      stack[aoaIndex] = 0;
      stack[aoaIndex - 1]++;
      aoaIndex--;
    }
    return combination;
  };
}

/*
У нас есть набор билетов вида:

[
 { from: 'London', to: 'Moscow' },
 { from: 'NY', to: 'London' },
 { from: 'Moscow', to: 'SPb' },
 ...
]

Из этих билетов можно построить единственный, неразрывный маршрут.
Петель и повторов в маршруте нет.

Нужно написать программу, которая возвращает билеты
в порядке следования по маршруту.
*/

// const tickets = [
//   { from: 'London', to: 'Moscow' },
//   { from: 'NY', to: 'London' },
//   { from: 'Moscow', to: 'SPb' },
// ]

// const fromCache = {
//   "London": {
//     "from": "London",
//     "to": "Moscow"
//   },
//   "NY": {
//     "from": "NY",
//     "to": "London"
//   },
//   "Moscow": {
//     "from": "Moscow",
//     "to": "SPb"
//   }
// }

// const toCache = {
//   "Moscow": {
//     "from": "London",
//     "to": "Moscow"
//   },
//   "London": {
//     "from": "NY",
//     "to": "London"
//   },
//   "SPb": {
//     "from": "Moscow",
//     "to": "SPb"
//   }
// }

function getRoute(tickets = []) {
  if (!tickets.length) {
    return [];
  }

  const fromCache = {};
  const toCache = {};
  const way = [];

  tickets.forEach((ticket) => {
    fromCache[ticket.from] = ticket;
    toCache[ticket.to] = ticket;
  });

  let currentPont = tickets[0];

  while (toCache[currentPont.from]) {
    currentPont = toCache[currentPont.from];
  }

  way.push(currentPont);

  while (fromCache[currentPont.to]) {
    currentPont = fromCache[currentPont.to];
    way.push(currentPont);
  }

  return way;
}

// функция поиска вариантов перелетов из точки

// Например, для

// findPath('A', 'N', fetchFlights).then((result) => console.log(result)); // Promise.resolve(['A', 'B', 'N']);)
// findPath('A', 'S', fetchFlights).then((result) => console.log(result)); // Promise.resolve(['A', 'D', 'F', 'S']);)
// findPath('B', 'S', fetchFlights).then((result) => console.log(result)); // Promise.reject(new Error('No way');)

// graph = { A: [B, D], B: [C, N, Z], D: [E, F], F: [S] }

async function findPath(start, end, fetchFlights) {
  const visited = new Set();
  const stack = [
    [start, [start]],
  ];

  while (stack.length) {
    const [currentNode, path] = stack.pop();

    if (currentNode === end) {
      return path;
    }

    if (!visited.has(currentNode)) {
      visited.add(currentNode);

      const neighbours = await fetchFlights(currentNode) || [];
      for (let neighbour of neighbours) {
        if (!visited.has(neighbour)) {
          stack.push([neighbour, [...path, neighbour]]);
        }
      }
    }
  }

  return 'No way';
}

// Дан упорядоченный массив натуральных чисел,
// повторяющихся элементов в списке нет.
// Нужно преобразовать в строку с перечислением интервалов через запятую.

// Пример:
// [2, 3, 5, 6, 7, 8, 9, 11, 20, 21, 22] -> “2-3,5-9,11,20-22”

function convertToIntervalString(arr) {
  let result = [];
  let start = arr[0];
  let end = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === end + 1) {
      end = arr[i];
    } else {
      result.push(start === end ? start.toString() : `${start}-${end}`);
      start = arr[i];
      end = arr[i];
    }
  }

  result.push(start === end ? start.toString() : `${start}-${end}`);

  return result.join(',');
}

// Нужно реализовать структуру данных, которая реализует методы:
// а) like(userId) – пользователь userId поставил лайк
// б) unlike(userId) – пользователь userId убрал лайк
// в) getMax() – узнать максимальное число лайков, которое поставил один пользователь

class LikesCounter {
  constructor() {
    this.likes = {};
  }

  like(userId) {
    if (this.likes[userId] === undefined) {
      this.likes[userId] = 1;
    } else {
      this.likes[userId] += 1;
    }
  }

  unlike(userId) {
    if (this.likes[userId]) {
      this.likes[userId] -= 1;

      if (this.likes[userId] < 0) {
        this.likes = 0;
      }
    }
  }

  getMax() {
    const values = Object.values(this.likes);
    return Math.max(...Object.values(this.likes));
  }
}

// На улице стоят n непокрашенных домов в ряд.
// Известна стоимость покраски каждого дома в один из k цветов.
// Жильцы этих домов большие завистники, поэтому никакие два дома, стоящие рядом, не могут иметь одинакового покраса.
// Найти минимальную стоимость покраски всех домов при указанных условиях.
// Входные данные: houses[][k] – массив стоимости покраски в каждый цвет для каждого дома.


// [
//    [1, 2, 3],
//    [1, 3, 2],
//    [3, 1, 2]
// ] → 4

function minCostPainting(houses) {
  const n = houses.length;
  const k = houses[0].length;
  const dp = Array.from({ length: n }, () => Array(k).fill(0));

  // Инициализация первого дома
  for (let j = 0; j < k; j++) {
    dp[0][j] = houses[0][j];
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < k; j++) {
      let minCost = Infinity;
      for (let prevColor = 0; prevColor < k; prevColor++) {
        if (prevColor !== j) {
          minCost = Math.min(minCost, dp[i - 1][prevColor]);
        }
      }
      dp[i][j] = houses[i][j] + minCost;
    }
  }

  return Math.min(...dp[n - 1]);
}

module.exports = {
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
};
