const { isCelebrateError } = require('celebrate');
const { BadRequestError } = require('../errors/400_bad-request-error');

const celebrateErrorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorPath = err.details.get('body');
    if (!errorPath) {
      throw new BadRequestError('id должен быть валидным');
    }
    throw new BadRequestError(errorPath.message);
  }
  return next(err);
};

module.exports = {
  celebrateErrorHandler,
};
