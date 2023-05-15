'use strict';

const PostService = require("../services/post.service");

class HomeController {
    showHome = async (req, res, next) => {
        const posts = await PostService.getAllPost(req.query);
        posts.map((post) => {
            post.dataValues.updated_at = post.dataValues.updated_at.toLocaleDateString('VN');
        });
        
        res.render("pages/home/home", {
            style: 'home.css',
            posts
        });
    }
}

module.exports = new HomeController();
