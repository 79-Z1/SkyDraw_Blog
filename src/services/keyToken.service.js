'use strict';

const { models: { KeyToken } } = require("../models");

class KeyTokenService {
    
    static createKeyToken = async ({ userId, refreshToken }) => {
        const [keyToken, created] = await KeyToken.findOrCreate({
            where: { user_id: userId },
            defaults: {
                refresh_token: refreshToken,
                user_id: userId
            }
        });
        if(created) return created;
        
        return keyToken;
    }

    static findKeyByUserId = async (userId) => {
        return await KeyToken.findOne({ where: { user_id: userId } })
    }

    static removeKeyByUserId = async (userId) => {
        return await KeyToken.destroy({ where: { user_id: userId } })
    }
}

module.exports = KeyTokenService;
