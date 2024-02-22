const CustomError = require('./CustomError');
const { StatusCodes } = require('http-status-codes');

class BadRequestError extends CustomError {
  constructor(message) {
    super(message);

    this.statusCode = StatusCodes.BAD_REQUEST;
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = BadRequestError;
