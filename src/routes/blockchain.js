const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validation = require('../middleware/validation');
const models = require('../models');

router.get('', async (req, res) => {
  res.json(await models.Blockchain.findAll());
});

router.get('/:id', validation({
  params: {
    id: Joi.number().integer().positive().required()
  }
}), async (req, res) => {
  const blockchain = await models.Blockchain.findByid(req.params.id);

  if (null === blockchain) {
    return res.boom.notFound();
  }

  res.json(blockchain);
});

module.exports = router;
