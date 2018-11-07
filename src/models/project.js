const { projectStatus } = require('../consts');

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: { type: DataTypes.STRING, allowNull: false },
    credentials: { type: DataTypes.JSON, allowNull: true },
    parameters: { type: DataTypes.JSON, allowNull: true },
    contract: { type: DataTypes.JSON, allowNull: true },
    status: {
      type: DataTypes.INTEGER,
      validate: {
        isIn: [Object.values(projectStatus)]
      },
      defaultValue: projectStatus.PROJECT_DRAFT,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'project'
  });

  Project.associate = models => {
    Project.belongsTo(models.Blockchain, {
      foreignKey: 'blockchain_id',
      onDelete: 'CASCADE',
      as: 'blockchain'
    });
  };

  return Project;
};
