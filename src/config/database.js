const defaultOptions = {
  dialect: 'sqlite',
  logging: console.log,
  migrationStorageTableName: 'migrations',
  freezeTableName: true,
  operatorsAliases: false,
  dialectOptions: {
    /**
     * Обязательный параметр для корректного сохранения данных в
     * decimal(27, 18) (миллионы и 18 чисел после запятой)
     * и корректного прокидывания из бд вместо строк - float
     */
    decimalNumbers: true
  },
  define: {
    underscored: true,
    freezeTableName: true,
    charset: 'utf8',
    paranoid: false,
    version: false
  }
};

module.exports = {
  production: defaultOptions,
  development: defaultOptions,
  test: {
    ...defaultOptions,
    logging: false
  }
};
