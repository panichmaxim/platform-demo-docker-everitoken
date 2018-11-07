const path = require('path');
const express = require('express');
const router = express.Router();

router.use('/', express.static(path.join(__dirname, '../../frontend')));
router.use('/project', require('./project'));
router.use('/blockchain', require('./blockchain'));

module.exports = router;
