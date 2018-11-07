const path = require('path');

module.exports = {
  node_modules: path.resolve(__dirname, '../../node_modules'),
  contract_path: path.resolve(__dirname, '../../contracts'),
  i18n: {
    default_locale: 'en',
    locales: [
      'en',
      'ru',
      'ja',
      'cn',
      'ko'
    ]
  }
};
