const express = require('express');
const router = express.Router();
const validation = require('../middleware/validation');
const models = require('../models');
const filterValues = require('../util/filterValues');
const systemWallet = require('../config/systemWallet');
const { projectStatus } = require('../consts');
const Joi = require('joi');

router.post('', validation({
  body: {
    blockchain: Joi.string().required(),
    name: Joi.string().max(255).required(),
    symbol: Joi.string().max(255).required(),
    rate: Joi.number().required(),
    type: Joi.string().allow('mintable', 'burnable').default('mintable'),
    supply: Joi.alternatives().when('type', {
      is: 'burnable',
      then: Joi.number().integer().positive().required(),
      otherwise: Joi.number().integer().positive()
    }).default(0),
    wallet: Joi.alternatives().when('type', {
      is: 'local',
      then: Joi.string(),
      otherwise: Joi.string().required()
    }).default(0),
    opening_time: Joi.date().iso(),
    closing_time: Joi.date().iso(),
    decimals: Joi.number().integer().positive().default(18).max(18),
    discount_token: Joi.array().items(Joi.object({
      discount: Joi.number().integer().required(),
      tokens: Joi.number().integer().required()
    }).allow(null, '')),
    discount_time: Joi.array().items(Joi.object({
      discount: Joi.number().integer().required(),
      time: Joi.date().iso().required()
    }).allow(null, '')),
    softcap: Joi.number().integer().positive().default(null),
    hardcap: Joi.number().integer().positive().default(null),
  }
}), async (req, res) => {
  const blockchain = await models.Blockchain.findOne({
    where: { code: req.body.blockchain }
  });
  if (null === blockchain) {
    return res.boom.notFound();
  }

  const parameters = {
    type: req.body.type,
    name: req.body.name,
    symbol: req.body.symbol,
    decimals: req.body.decimals,
    rate: req.body.rate,
    supply: req.body.supply,
    wallet: req.body.wallet
  };

  const { id } = await models.Project.create(filterValues({
    ...req.body,
    parameters,
    credentials: systemWallet[blockchain.code] || {},
    blockchain_id: blockchain.id,
    status: projectStatus.PROJECT_DONE,
  }));

  res.status(201).json({ id });
});

router.get('', async (req, res) => {
  const rows = await models.Project.findAll({
    include: [
      { model: models.Blockchain, as: 'blockchain' }
    ],
    order: [
      ['id', 'DESC']
    ]
  });

  res.json(rows);
});

router.get('/:id', validation({
  params: {
    id: Joi.number().integer().positive().required()
  }
}), async (req, res) => {
  const project = await models.Project.findById(req.params.id, {
    include: [
      { model: models.Blockchain, as: 'blockchain' }
    ]
  });
  if (null === project) {
    return res.boom.notFound();
  }

  res.json(project);
});

module.exports = router;
