const logger = require('./logger.js');
const morgan = require('morgan');

const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms');

// Error handler
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }
  next(error);
};

module.exports = { morganMiddleware, errorHandler };