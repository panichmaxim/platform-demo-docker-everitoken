const models = require('./src/models');

module.exports = async function () {
  await models.sequelize.sync({ force: true });

  const fixtures = [
    { name: 'EveriToken', code: 'everitoken' }
  ];
  for (let i = 0; i < fixtures.length; i++) {
    await models.Blockchain.create(fixtures[i]);
  }
};
