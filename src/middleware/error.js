const joiUtils = require('../util/joiUtils');

module.exports = (error, req, res, next) => {
  if (error.isJoi) {
    return res.boom.badRequest(null, {
      errors: joiUtils.formatJoi(error, req.t)
    });
  }

  if (error instanceof Error) {
    console.log(error);

    return res.boom.badImplementation(null, {
      error: error.toString(),
      statusCode: 500
    });
  }

  return next(error);
};
