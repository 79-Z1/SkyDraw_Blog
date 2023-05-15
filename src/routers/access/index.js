'use strict'
const express = require('express');
const { authentication } = require('../../auth/authUtils');
const acessController = require('../../controllers/acess.controller');
const { errorHandler } = require('../../middlewares/error.middleware');
const router = express.Router();

router.use('/blog/signup', errorHandler(acessController.signUp));
router.use('/blog/login', errorHandler(acessController.logIn));

//~ Authentication
router.use(authentication);
router.use('/blog/logout', errorHandler(acessController.logout));

module.exports = router;