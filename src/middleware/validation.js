const Joi = require('joi');

const validate = (source, schema, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!schema) {
      return resolve(source);
    }

    Joi.validate(source, schema, options, (err, value) => {
      if (err) {
        reject(err);
      } else {
        // Apply any Joi transforms back to the request
        resolve(value === undefined ? source : value);
      }
    });
  })
};

const validation = (schema = {}, options = {}) => {
  const structure = Joi.object().keys({
    headers: Joi.any(),
    params: Joi.any(),
    query: Joi.any(),
    body: Joi.any()
  }).min(1);

  options = {
    abortEarly: false,
    allowUnknown: true,
    ...options
  };

  return async (req, res, next) => {
    const result = Joi.validate(schema, structure);
    if (result.error) {
      return next(result.error);
    }

    const keys = Object.keys(schema);
    for (let i = 0; i < keys.length; i++) {
      schema[keys[i]] = Joi.compile(schema[keys[i]]);
    }

    try {
      if (schema.headers) {
        req.headers = await validate(req.headers, schema.headers, options);
      }

      if (schema.params) {
        req.params = await validate(req.params, schema.params, options);
      }

      if (schema.query) {
        req.query = await validate(req.query, schema.query, options);
      }
    } catch (error) {
      return next(error);
    }

    const method = req.method.toLowerCase();
    if (method === 'get' || method === 'head') {
      return next();
    }

    try {
      if (schema.body) {
        req.body = await validate(req.body, schema.body, options);
      }
      next();
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = validation;
