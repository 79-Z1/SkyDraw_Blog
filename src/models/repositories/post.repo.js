'use strict';

const { Sequelize } = require("sequelize");
const { db: { Post: PostDB, User: UserDB } } = require("..");
const { models: { Post, User, Category } } = require("..");


const getAllPost = async ({ limit, sort, page }) => {
    return await PostDB.findAll({
        order: [
            [sort, 'DESC']
        ],
        offset: (page - 1) * limit,
        limit: limit,
        subQuery: false,
        include: [
            {
                model: User,
                attributes: ['user_id', 'username', 'email'],
                require: true
            },
            {
                model: Category,
                through: {
                    attributes: []
                },
                require: true
            },

        ]
    })
}

const getPostById = async ({ post_id, unSelect = [] }) => {
    return await Post.findOne({
        where: {
            post_id: post_id
        },
        attributes: { exclude: [...unSelect] }
    })
}

const searchPostsByUser = async (keySearch) => {
    return await Post.findAll({
        where: Sequelize.literal('CONTAINS([title],:text)'),
        replacements: {
            text: keySearch
        }
    })
}

const createPost = async ({ title, content, thumbnail, user_id }) => {
    return Post.create({ title, content, thumbnail, user_id })
}

module.exports = {
    getAllPost,
    searchPostsByUser,
    getPostById,
    createPost
};
