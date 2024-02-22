const CustomError = require('./CustomError');
const { StatusCodes } = require('http-status-codes');

class RequestValidationError extends CustomError {
  constructor(errors) {
    super('Invalid request parameters');

    this.statusCode = StatusCodes.BAD_REQUEST;

    this.errors = errors;
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, fields: err.param };
    });
  }
}

module.exports = RequestValidationError;
