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

  return () => {
    if (number > 0) {
      number--;
      return 'yes';
    }

    return 'no';
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
  let result = '#';
  for (let i = 0; i < 6; i++) {
    let random = Math.floor(Math.random() * 16);
    result += random.toString(16);
  }
  return result;
}


// function getRandomHexColor() {
//   let random = Math.floor(Math.random() * (256 * 256 * 256));
//   return '#' + random.toString(16);
// }

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

function cache(getData, ts) {
  let lastCall;
  let data;

  return async () => {
    if (!lastCall || Date.now() - lastCall >= ts) {
      data = await getData();
      lastCall = Date.now();
    }
    return data;
  };
}

// function cache(getData, ts) {
//   let lastCall;
//   let dataPromise;
//
//   return async () => {
//     if (!lastCall || Date.now() - lastCall >= ts) {
//       dataPromise = getData;
//       lastCall = Date.now();
//     }
//
//     return dataPromise;
//   };
// }

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
    return functionArray.reduceRight((acc, fn) => {
      return [fn.apply(this, acc)];
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

// function flatten(list) {
//   const result = [];
//
//   for(const item of list) {
//     if(Array.isArray(item)) {
//       const nestedResult = flatten(item);
//       result.push(...nestedResult);
//     } else {
//       result.push(item);
//     }
//   }
//
//   return result;
// }

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
    result.forEach((value, index) => {
      sortedLimit[1] -= value[0];
    });

    return result.filter((x) => x[0]).map((x) => x.join('x')).join(' ');
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

// const tickets = [
//   { from: 'London', to: 'Moscow' },
//   { from: 'NY', to: 'London' },
//   { from: 'Moscow', to: 'SPb' },
// ]

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
    { node: start, path: [start] },
  ];

  while (stack.length) {
    const { node: currentNode, path } = stack.pop();

    if (currentNode === end) {
      return path;
    }

    if (!visited.has(currentNode)) {
      visited.add(currentNode);

      const neighbours = await fetchFlights(currentNode) || [];
      for (let neighbour of neighbours) {
        if (!visited.has(neighbour)) {
          stack.push({ node: neighbour, path: [...path, neighbour] });
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
      this.likes[userId] = 0;
    }

    this.likes[userId] += 1;
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

// ["aba", "cdc", "eae"]
// ["aaa", "aaa", "aa"]
// ["aaa","acb"]

const findLUSLength = function(strs) {
  function isSubsequence(str1, str2) {
    let i = 0;
    for (let j = 0; j < str1.length && i < str2.length; j++) {
      const char1 = str1.charAt(i);
      const char2 = str2.charAt(j);

      if (char1 === char2) {
        i++;
      }
    }

    return i === str1.length;
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

// Типичный пример первой задачи: в массиве из чисел нужно найти наибольший неубывающий подотрезок,
// то есть такой подотрезок из чисел, где каждое следующее число больше или равно предыдущему.
// При разработке алгоритма важно учитывать крайние случаи и время, за которое он выполнится.

// [1, 3, 5, 4, 7, 8, 9, 2, 1, 2, 3, 4, 5];

function testFn2(arr) {
  let result = [];
  let currentResult = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    const currentNumber = arr[i]; // 5
    const prevNumber = arr[i - 1]; // 4

    if (currentNumber >= prevNumber) {
      currentResult.push(currentNumber);
    } else {
      if (currentResult.length > result.length) {
        result = currentResult;
      }
      currentResult = [currentNumber];
    }
  }

  if (currentResult.length > result.length) {
    result = currentResult;
  }

  return result;
}

function timeLimit(fn, t) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      let timer = setTimeout(() => {
        reject('Time Limit Exceeded');
      }, t);

      fn(...args).then((result) => {
        clearTimeout(timer);
        resolve(result);
      }).catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
    });
  };
}


/**
 * На вход функции подаётся массив границ и массив значений. Оба массива целых чисел, отсортированных по возрастанию.
 * Например, границы [4, 8] и значения [1, 3, 4, 5, 8, 9].
 * Нужно раскидать значения по диапазонам (-inf; 4], (4; 8], (8; +inf) и для каждого
 * посчитать количество и сумму попавших в неё значений:
 * [1, 3, 4] -> {quantity: 3, sum: 8}, [5, 8] -> {quantity: 2, sum: 13}, [9] -> {quantity: 1, sum: 9}
 * На выходе всегда ожидается массив размером на 1 больше, чем количество границ.
 * --------------------------------
 * [4, 8], [1, 3, 4, 5, 8, 9] => [{quantity: 3, sum: 8}, {quantity: 2, sum: 13}, {quantity: 1, sum: 9}]
 *        4     8
 *  1 3 4 | 5 8 | 9
 * 2 границы создают 3 диапазона.
 * --------------------------------
 * [5], [2, 4, 6, 8] => [{quantity: 2, sum: 6}, {quantity: 2, sum: 14}]
 *     5
 * 2 4 | 6 8
 * Числа 2, 4 попадают в первый диапазон, остальные - во второй.
 * --------------------------------
 *  [7], [1, 2] => [{quantity: 2, sum: 3}, {quantity: 0, sum: 0}]
 *      7
 *  1 2 |
 * Второй диапазон пуст.
 **/

function calculate(borders, values) {
}

// Написать калькулятор выражений в обратной польской нотации.
//   Польская нотация
// Выражение состоит из операндов: чисел и знаков операций + - * /
// Выражение читается слева направо
// Операнды в выражении разделяются пробелами
// Когда в выражении встречается знак операции, выполняется соответствующая операция над двумя последними встретившимися перед ним операндами в порядке их записи
// Результатом вычисления выражения становится результат последней вычисленной операции
// Примеры:
//   calc('7 2 * 3 +')  => 7 * 2 + 3 = 17
// calc('7 2 3 * -')  => 7 - (2 * 3) = 1
// calc('7 2 3 1 + * -')  => 7 - 2 * (3 + 1) = -1
//
// calc('11 -12 -')  => ?
//   calc('7 2 3 1 * - - 3 5 + -') => ?
//
//   calc('1 1 + +')   => Error in Syntax
// calc('1 2 2 *')   => Error in Syntax
// calc('1 b + c -')  => Error in Operands


// Есть функция batchFetch для запроса данных из бэкенда по id, работающая следующим образом:
//
// function batchFetch(ids: string[]): Promise<Record<string, object>>;
//
// batchFetch([1]) -> Promise { 1: { id: 1, title: 'one', ... } }
// batchFetch([2]) -> Promise { 2: { id: 2, title: 'two', ... } }
// batchFetch([1, 2]) -> Promise { 1: { id: 1, title: 'one', ... }, 2: { id: 2, title: 'two', ... } }
//
//
// Нужно написать обертку, создающую функцию "smartRequest(id)",
// склеивающую вызовы в один (c окном timeout мс),
// для уменьшения количества запросов к бэкенду.
// Важно отметить, это не debounce, а склеивание запросов к бэкенду, т.е. все вызовы функции должны вернуть значение.
//
// const smartRequest = createSmartRequest(100);
//
// const a = smartRequest(1) // начинаем ждать 100мс
// const b = smartRequest(2) // все еще ждем
// прошло 100 мс, вызывается batchFetch([1, 2]) и резолвятся промизы a и b
//
// - Считаем, что в пределах таймаута все id уникальные
// - Считаем, что batchFetch всегда успешен

async function batchFetch(ids) {
  const promises = [];
  for (const id of ids) {
    promises.push(new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, title: id });
      }, 10);
    }));
  }

  return Promise.all(promises);
}

function createSmartRequest(timeout) {
  let timer;
  const batches = [];

  return function smartRequest(id) {
    batches.push(id);

    if (!timer) {
      timer = setTimeout(async () => {
        await batchFetch(batches);
        batches.length = 0;
        timer = null;
      }, timeout);
    }
  };
}

// Дана вложенная структура файлов и папок.
// {
//   name: 'folder',
//   children: [
//     { name: 'file1.txt' },
//     { name: 'file2.txt' },
//     {
//       name: 'images',
//       children: [
//         { name: 'image.png' },
//         {
//           name: 'vacation',
//           children: [
//             { name: 'crocodile.png' },
//             { name: 'penguin.png' },
//           ],
//         },
//       ],
//     },
//     { name: 'shopping-list.pdf' },
//   ],
// };
// Нужно вывести в консоль файлы и папки с отступами, чтобы показать вложенность. Решение должно учитывать любую вложенность элементов (т.е. не должно содержать рекурсивные вызовы). Входные данные должны оставаться неизменными. Пример вывода:
//   folder
//      file1.txt
//      file2.txt
//      images
//          image.png
//          vacation
//              crocodile.png
//              penguin.png
//      shopping-list.pdf

function folders(tree) {
  let result = '';
  const stack = [];
  let current = { array: [tree], index: 0 };
  let nestIndex = 0;

  const getString = (name) => {
    const spaces = Array(nestIndex).fill('').reduce((a) => a + ' ', '');
    return `${spaces}${name}\n`;
  }

  while (current) {
    const { array, index } = current;
    current.index++;

    if (index < array.length) {
      if (Array.isArray(array[index].children)) {
        result += getString(array[index].name);
        stack.push(current);
        current = { array: array[index].children, index: 0 };
        nestIndex++;
      } else {
        result += getString(array[index].name);
      }
    } else {
      current = stack.pop();
      nestIndex--;
    }
  }

  return result;
}


// Дана древовидная структура следующего формата:
//   const tree = {
//     type: 'nested',
//     children: [
//       { type: 'added', value: 42 },
//       {
//         type: 'nested',
//         children: [
//           { type: 'added', value: 43 },
//         ]
//       },
//       { type: 'added', value: 44 },
//       ...
//     ]
//   }
// Необходимо написать функцию getNodes(tree, type), которая возвращает все ноды в порядке следования, соответсвующие переданному типу.
//   Глубина вложенности любая.
//   Пример:

function getNodes(tree, type) {
  const result = [];
  const stack = [];
  let current = { array: [tree], index: 0 };

  while (current) {
    const { array, index } = current;
    current.index++;

    if (index < array.length) {
      if (array[index].type === type) {
        result.push({ type, value: array[index].value });
      }

      if (Array.isArray(array[index].children)) {
        stack.push(current);
        current = { array: array[index].children, index: 0 };
      }
    } else {
      current = stack.pop();
    }
  }

  return result;
}

// Результат

// [
//   { type: 'added', value: 42 },
//   { type: 'added', value: 43 },
//   { type: 'added', value: 44 },
//   ...
// ]


/*
Дан массив ссылок: ['url1', 'url2', ...] и лимит одновременных запросов (limit)
Необходимо реализовать функцию, которая опросит урлы в том порядке, в котором они идут в массиве, и вызовет callback c массивом ответов
['url1_answer', 'url2_answer', ...] так, чтобы в любой момент времени выполнялось не более limit
запросов (как только любой из них завершился, сразу же отправляется следующий)
Т.е. нужно реализовать шину с шириной равной limit.

Требования:
- Порядок в массиве ответов должен совпадать с порядком в массиве ссылок
Дополнительно:
- Функция должна обладать мемоизацией (один и тот же урл не опрашивать дважды)

Для опроса можно использовать fetch или $.get
Ошибки обрабатывать не нужно

*/
// declare function fetch(url: string): Promise<string>;
// declare function $.get(url: string, callback: (res: string) => void): void;

async function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(url), 300);
  });
}

async function parallelLimit(urls, limit, callback) {
  const results = [];
  const memo = {};
  let index = 0;

  async function fetchUrl(url, currentIndex) {
    let result;
    if (memo[url]) {
      result = memo[url];
    } else {
      result = await fetchData(url);
      memo[url] = result;
    }

    results[currentIndex] = result;
  }

  async function processNext() {
    if (index < urls.length) {
      const currentUrl = urls[index];
      const currentIndex = index;
      index++;

      await fetchUrl(currentUrl, currentIndex);
      await processNext();
    }
  }

  const promises = [];
  for (let i = 0; i < Math.min(limit, urls.length); i++) {
    promises.push(processNext());
  }

  await Promise.all(promises);
  callback(results);
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++

// let i = 10;
// const array = [];
//
// while (i--) {
//   array.push(function() {
//     return i + i;
//   });
// }
//
// console.log([
//   array[0](), // -2
//   array[1](), // -2
// ]);

// +++++++++++++++++++++++++++++++++++++++++++++++++++

// let i = 10;
// const array = [];
//
// while (--i) {
//   array.push(function() {
//     return i + i;
//   });
// }
//
// console.log([
//   array[0](), // 0
//   array[1](), // 0
// ]);

// +++++++++++++++++++++++++++++++++++++++++++++++++++

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
  minCostPainting,
  findLUSLength,
  testFn2,
  parallelLimit,
  getNodes,
  folders,
};
