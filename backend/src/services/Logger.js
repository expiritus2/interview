class Logger {
  static log(...messages) {
    if (process.env.NODE_ENV !== 'test') {
      console.log(...messages);
    }
  }

  static info(...messages) {
    if (process.env.NODE_ENV !== 'test') {
      console.info(...messages);
    }
  }

  static warn(...messages) {
    if (process.env.NODE_ENV !== 'test') {
      console.warn(...messages);
    }
  }

  static error(...messages) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(...messages);
    }
  }

  static debug(...messages) {
    if (process.env.NODE_ENV !== 'test') {
      console.debug(...messages);
    }
  }
}

module.exports = Logger;
