'use strict';

const { CREATED, OK, SuccessResponse } = require("../core/success.response");
const PostService = require("../services/post.service");

class PostController {
    
    createPost = async(req, res, next) => {
        return new SuccessResponse({
            message: 'create post success',
            metadata: await PostService.createPost(req.user.userId, req.body)
        }).send(res);
    }

    getAllPost = async(req, res, next) => {
        return new SuccessResponse({
            message: 'get all post success',
            metadata: await PostService.getAllPost(req.query)
        }).send(res);
    }

    getPostById = async(req, res, next) => {
        return new SuccessResponse({
            message: 'get Post By Id success',
            metadata: await PostService.getPostById(req.params)
        }).send(res);
    }

    searchPostsByUser = async(req, res, next) => {
        return new SuccessResponse({
            message: 'searchPostsByUser success',
            metadata: await PostService.searchPostsByUser(req.params)
        }).send(res);
    }

    showCreatePage = async (req, res, next) => {
        res.render("pages/post/create", {
			style: 'create_post.css',
			script: 'create_post.js'
        });
    }

    showSearchPage = async (req, res, next) => {
        res.render("pages/post/search_post", {
			style: 'search_post.css',
			script: 'search_post.js'
        });
    }
    
}

module.exports = new PostController();