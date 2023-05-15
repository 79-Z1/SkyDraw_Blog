'use strict';
const express = require('express');
const { errorHandler } = require('../../middlewares/error.middleware');
const CategoryController = require('../../controllers/category.controller');
const router = express.Router();

router.post('', errorHandler(CategoryController.createCategory))


module.exports = router;