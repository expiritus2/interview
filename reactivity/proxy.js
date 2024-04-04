const person = {
  name: 'Pavel',
  age: 22,
};

const reactivePerson = new Proxy(person, {
// Перехват операции set (установки)
  set(target, key, value) {
    console.log(`Setting ${key} to ${value}`);
    target[key] = value;

// Указывает, была ли успешной операция установки
    return true;
  },
// Перехват операции get (получения)
  get(target, key) {
    console.log(`Getting ${key}`);

    return target[key];
  },
});

reactivePerson.name = 'Sergei'; // Установка имени Сергей
console.log(reactivePerson.name); // Получение имени: Сергей

reactivePerson.age = 23; // Установка возраста - 23 года
console.log(reactivePerson.age); // Получение возраста: 23 года
