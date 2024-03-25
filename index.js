// [1, 2, 3, 3444] => [3444, 3, 2, 1]

function reverse(array) {
  const copyArr = JSON.parse(JSON.stringify(array));
  let buf;
  let length = copyArr.length;
  for (let i = 0; i < length / 2; i++) {
    let index = length - 1 - i;
    buf = copyArr[i];
    copyArr[i] = copyArr[index];
    copyArr[index] = buf;
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


const countSymbols = (S) => {
  let currentChar;
  let currentCount = 0;
  let max = 0;

  for (let i = 0; i < S.length; i++) {
    if (currentChar === S.charAt(i)) {
      currentCount++;
    } else {
      if (max < currentCount) {
        max = currentCount;
      }

      currentChar = S.charAt(i);
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

function debounce(fn, timeout) {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
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
    const startChar = str[start];
    const endChar = str[end];

    if (!isLetter(startChar)) {
      start += 1;
      continue;
    }

    if (!isLetter(endChar)) {
      end -= 1;
      continue;
    }

    if (!isEqual(start, endChar)) {
      return false;
    }


    start += 1;
    end -= 1;
  }

  return true;
}

function testFn(array) {
  const buf = array.filter(value => value % 2 === 1).sort((a, b) => a - b);
  let bufIndex = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 === 1) {
      array[i] = buf[bufIndex];
      bufIndex++;
    }
  }

  return array;
}


// reduceRight
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
  const sortedLimits = limit.sort((a, b) => b[0] - a[0]);
  const smallestBanknote = sortedLimits[sortedLimits.length - 1][0];
  const result = [];

  if(sum % smallestBanknote !== 0) {
    return 'Error: Incorrect value';
  }

  sortedLimits.forEach((limit) => {
    const [nominal, limitAmount] = limit;
    const currentBanknoteAmount = Math.floor(sum / nominal);
    const currentAmount = currentBanknoteAmount > limitAmount ? limitAmount : currentBanknoteAmount;
    sum -= currentAmount * nominal;
    result.push([nominal, currentAmount]);
  });

  if(sum === 0) {
    result.forEach((value, index) => {
      sortedLimits[index][1] -= value[index][1]
    });

    return result.map((x) => x[1]).map((x) => x.join('x')).join(' ');
  } else {
    return 'Error: Not enough money';
  }
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
};
