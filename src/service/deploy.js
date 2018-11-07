const { Op } = require('sequelize');
const models = require('../models');
const { projectStatus } = require('../consts');
const Wallet = require('./deployer/wallet');
const factoryDeploy = require('./deployer');

module.exports = {
  async deployProjects() {
    const projects = await models.Project.findAll({
      where: {
        status: projectStatus.PROJECT_DONE
      },
      include: [
        {
          model: models.Blockchain,
          as: 'blockchain',
          where: {
            code: {
              [Op.not]: 'local'
            }
          }
        }
      ]
    });

    for (let i = 0; i < projects.length; i++) {
      await this.deployEveriToken(projects[i]);
    }
  },

  async deployEveriToken(project) {
    const wallet = new Wallet(project.credentials.address, project.credentials.privateKey);
    const provider = factoryDeploy.createProvider(project.blockchain.code, wallet);

    await project.update({
      status: projectStatus.PROJECT_READY,
      contract: {
        token: await provider.createToken(project.parameters)
      }
    });
  }
};
