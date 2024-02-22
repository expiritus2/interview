const CustomError = require('./CustomError');
const { StatusCodes } = require('http-status-codes');

class NotFoundError extends CustomError {
  constructor() {
    super('Route not found');

    this.statusCode = StatusCodes.NOT_FOUND;
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = NotFoundError;
