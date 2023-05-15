'use strict'
const express = require('express');
const acessController = require('../../controllers/acess.controller');
const homeController = require('../../controllers/home.controller');
const { errorHandler } = require('../../middlewares/error.middleware');
const postController = require('../../controllers/post.controller');
const router = express.Router();

router.get('/blog/signup', acessController.showSignUp);
router.get('/blog/login', acessController.showLogIn);
router.get('/post', postController.showCreatePage);
router.get('/post/search', postController.showSearchPage);
router.use('/', homeController.showHome);

module.exports = router;