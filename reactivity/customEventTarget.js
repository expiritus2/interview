class CustomEventTarget extends EventTarget {
  constructor() {
    super();
  }

// Пользовательский метод для запуска событий
  triggerCustomEvent(eventName, eventData) {
    const event = new CustomEvent(eventName, { detail: eventData });
    this.dispatchEvent(event);
  }
}

const customTarget = new CustomEventTarget();

// Добавление слушателя событий к цели пользоваельского события
customTarget.addEventListener('customEvent', (event) => {
  console.log(`Custom event received with data: ${event.detail}`);
});

// Запуск пользовательского события
customTarget.triggerCustomEvent('customEvent', 'Hello, custom event!');

// Запись в журнале консоли:
// Custom event received with data: Hello, custom event!
