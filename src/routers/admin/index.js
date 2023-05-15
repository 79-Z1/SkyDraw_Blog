'use strict';
const express = require('express');
const { errorHandler } = require('../../middlewares/error.middleware');
const AdminController = require('../../controllers/admin.controller');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

/// ---------------------------- No need check authen route ---------------------------- ///
// router.get('', errorHandler(AdminController.showHome))

/// AUTHENTICATION
router.use(authentication)

/// ---------------------------- Need check authen route ---------------------------- ///


module.exports = router;