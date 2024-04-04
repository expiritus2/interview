class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

// Удаление наблюдателя из списка
  removeObserver(observer) {
    const index = this.observers.indexOf(observer);

    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

// Уведомление всех наблюдателей об изменениях
  notify() {
    this.observers.forEach((observer) => {
      observer.update();
    });
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

// Вызов метода update при получении уведомления
  update() {
    console.log(`${this.name} received an update.`);
  }
}

const subject = new Subject();
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

// Добавление наблюдателей к субъекту
subject.addObserver(observer1);
subject.addObserver(observer2);

// Уведомление наблюдателей об изменениях
subject.notify();

// Записи в журнале консоли:
// Observer 1 received an update.
// Observer 2 received an update.
