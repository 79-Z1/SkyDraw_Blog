'use strict'
const express = require('express');
const router = express.Router();

router.use('/v1/api/post', require('./post'));
router.use('/v1/api/category', require('./category'));
router.use('/v1/api', require('./access'));
router.use('/', require('./public'));

module.exports = router;