class CustomError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = undefined;

    if (!this.serializeErrors) {
      throw new Error(`${this.constructor.name} must implement method serializeErrors`);
    }
  }

  serializeErrors() {}
}

module.exports = CustomError;
