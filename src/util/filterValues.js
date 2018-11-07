function filterValues(body) {
  let result = {};

  for (let key in body) {
    if (typeof body[key] === 'undefined') {
      continue;
    }

    // form enctype=multipart fix
    if (body[key] === 'null') {
      continue;
    }

    result[key] = body[key];
  }

  return result;
}

module.exports = filterValues;
