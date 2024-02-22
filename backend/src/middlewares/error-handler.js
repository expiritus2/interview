const CustomError = require('../errors/CustomError');
const Logger = require('../services/Logger');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode || 500).send({ errors: err.serializeErrors() });
  }

  Logger.error(err);

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};

module.exports = errorHandler;
