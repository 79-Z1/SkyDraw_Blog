'use strict';
const express = require('express');
const { errorHandler } = require('../../middlewares/error.middleware');
const PostController = require('../../controllers/post.controller');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

/// ---------------------------- No need check authen route ---------------------------- ///
router.get('', errorHandler(PostController.getAllPost))
router.get('/search/:keySearch', errorHandler(PostController.searchPostsByUser))

/// AUTHENTICATION
router.use(authentication)

/// ---------------------------- Need check authen route ---------------------------- ///
router.post('', errorHandler(PostController.createPost))
router.get('/:post_id', errorHandler(PostController.getPostById))


module.exports = router;
