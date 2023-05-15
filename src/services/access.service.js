const { models: { User } } = require('../models/index')
const { ConflictError } = require('../core/error.response');
const { findOne, create, getInfoData, getId } = require('../utils/common.util')
const bcrypt = require('bcrypt');
const { CREATED } = require('../core/success.response');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const UserService = require('./user.service');

class AccessService {

    static async logout(keyStore) {
        return await KeyTokenService.removeKeyByUserId(keyStore['user_id']);
    }

    static async signUp({ username, email, password }) {
        const user = await User.findOne({ where: { email } });

        if (user) throw new ConflictError('Email already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const { dataValues: newUser } = await User.create({
            username, email, password: hashedPassword
        })

        if (newUser) {
            const { accessToken, refreshToken } = await createTokenPair({
                userId: newUser.user_id,
                username: newUser.ussername,
                email: newUser.email,
            },
                process.env.SECRET_KEY
            );

            const keyToken = await KeyTokenService.createKeyToken({ userId: newUser['user_id'], refreshToken });
            if (!keyToken) throw new ConflictError('Key token generation failed');

            return {
                user: getInfoData({ fields: ['user_id', 'username', 'email'], object: newUser }),
                accessToken,
                refreshToken
            }
        } else throw new ConflictError('User creation failed');
    }

    static async logIn({ username, password }) {

        const user = await UserService.findUserByUsername(username);
        if (!user) throw new ConflictError('User does not exist'); //#

        const userPassword = await bcrypt.compare(password, user.password);
        if (!userPassword) throw new ConflictError('Password is incorrect'); //#

        const { user_id, email } = user;
        const { accessToken, refreshToken } = await createTokenPair(
            { userId:user_id, username, email }, process.env.SECRET_KEY
        );

        const keyToken = await KeyTokenService.createKeyToken({ userId: user_id, refreshToken })
        if (!keyToken) throw new ConflictError('Key token generation failed');
        
        return {
            user: getInfoData({ fields: ['user_id', 'username', 'email'], object: user }),
            accessToken,
            refreshToken
        }


    }
}

module.exports = AccessService;
