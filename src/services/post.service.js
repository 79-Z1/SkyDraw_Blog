'use strict';

const { BadrequestError } = require("../core/error.response");
const { models: { Post,User, PostCategory } } = require("../models");
const { getAllPost, searchPostsByUser, getPostById } = require("../models/repositories/post.repo");


class PostService {
    static createPost = async ( userId, {title = '', content = '', thumbnail = '', categories = []} ) => {
        const user = await User.findOne({ where: { user_id: userId } })
        if (!user) throw new BadrequestError('Invalid userId');

        const newPost = await Post.create({ title, content, thumbnail, user_id:userId })
        if (!user) throw new BadrequestError('Create Post failed');

        categories.map(( async (categoryId) =>  {
            await PostCategory.create({ post_id: newPost['post_id'], category_id: categoryId })
        }))

        return newPost;
    }

    static getAllPost = async ( {limit = 20, sort = 'updated_at', page = 1} ) => {
        return getAllPost({ limit, sort, page })
    }

    static getPostById = async ({ post_id }) => {
        return await getPostById({ post_id,
            unSelect: []
        })
    }

    static searchPostsByUser = async ( {keySearch = ''} ) => {
        return await searchPostsByUser(keySearch);
    }
}

module.exports = PostService;