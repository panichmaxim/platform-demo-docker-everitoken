function transMock(id) {
  return id;
}

function formatJoi(error, trans = null) {
  trans = trans || transMock;
  let errors = {};

  if (error && error.details) {
    for (let i = 0; i < error.details.length; i++) {
      const err = error.details[i];
      const path = err.path.join('.').replace(/"/g, '');

      if (typeof errors[path] === 'undefined') {
        errors[path] = [];
      }

      const message = err.message
        .replace(path, trans(err.context.label))
        .replace(/"/g, '');

      errors[path].push(message);
    }
  }

  return errors;
}

module.exports = {
  formatJoi,
};
