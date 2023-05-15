'use strict';

const { models: { User } } = require("../models");

class UserService {
    static findUserByUsername = async (username) => {
        return await User.findOne({
            where: { username: username }
        })
    }

}

module.exports = UserService;