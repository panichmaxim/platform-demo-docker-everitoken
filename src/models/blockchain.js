module.exports = (sequelize, DataTypes) => {
  const Blockchain = sequelize.define('Blockchain', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    code: { type: DataTypes.STRING, allowNull: false, unique: true }
  }, {
    timestamps: false,
    tableName: 'blockchain'
  });

  Blockchain.associate = models => {

  };

  return Blockchain;
};
