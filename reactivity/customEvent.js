const customEvent = new CustomEvent('customEvent', {
  detail: 'Custom event data', // Прикрепление нужных данных к событию
});

const element = document.getElementById('.element-to-trigger-events');

element.addEventListener('customEvent', (event) => {
  console.log(`Subscriber 1 received custom event: ${event.detail}`);
});

element.addEventListener('customEvent', (event) => {
  console.log(`Subscriber 2 received custom event: ${event.detail}`);
});

// Запуск пользовательского события
element.dispatchEvent(customEvent);

// Записи в журнале консоли:
// Subscriber 1 received custom event: Custom event data
// Subscriber 2 received custom event: Custom event data
