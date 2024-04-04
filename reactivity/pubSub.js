class PubSub {
  constructor() {
    this.subscribers = {};
  }

  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }

    this.subscribers[event].push(callback);
  }

// Публикация сообщения об определенном событии для всех подписчиков
  publish(event, data) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach((callback) => {
        callback(data);
      });
    }
  }
}

const pubsub = new PubSub();

pubsub.subscribe('news', (message) => {
  console.log(`Subscriber 1 received news: ${message}`);
});

pubsub.subscribe('news', (message) => {
  console.log(`Subscriber 2 received news: ${message}`);
});

// Публикация сообщения к событию 'news'
pubsub.publish('news', 'Latest headlines: ...');

// Записи в журнале консоли:
// Subscriber 1 received news: Latest headlines: ...
// Subscriber 2 received news: Latest headlines: ...
