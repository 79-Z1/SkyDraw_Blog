const JWT = require('jsonwebtoken');
const { NotFoundError, AuthFailurError } = require('../core/error.response');
const { errorHandler } = require('../middlewares/error.middleware');
const { findKeyByUserId } = require('../services/keyToken.service');

const HEADER = {
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
    REFRESHTOKEN: 'x-rtoken-id'
}


const createTokenPair = async(payload, key) => { 
    const accessToken = await JWT.sign( payload, key, {
        expiresIn: '2 days'
    });

    const refreshToken = await JWT.sign( payload, key, {
        expiresIn: '7 days'
    });

    JWT.verify(accessToken, key, (err, decode) => {
        if(err) {
            console.error(`error verify:::`, err);
        } else {
            console.log(`decode verify:::`, decode);
        }
    });
    return { accessToken, refreshToken };
}

const authentication = errorHandler(async (req, res, next) => {
    //1. check userid 
    const userId = req.headers[HEADER.CLIENT_ID];
    if(!userId) throw new AuthFailurError('Invalid Request');

    //2. get KeyToken
    const keyStore = await findKeyByUserId(userId);
    if(!keyStore) throw new NotFoundError('Not found keyStore');

    if(req.headers[HEADER.REFRESHTOKEN]) {
        const refreshToken = req.headers[HEADER.REFRESHTOKEN];
        try {
            const decodeUser = JWT.verify(refreshToken, keyStore.privateKey);
            if(userId !== decodeUser.userId) throw new AuthFailurError('Invalid UserId');
            req.keyStore = keyStore;
            req.user = decodeUser;
            req.refreshToken = refreshToken;
            
            return next();
        } catch(error) {
            throw error
        }
    }
        
    //3 verify token
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if(!accessToken) throw new AuthFailurError('Invalid Request');

    //4. check user in dbs
    //5. check keyStore with this userId
    //6. OK all => return next()
    try {
        const decodeUser = JWT.verify(accessToken, process.env.SECRET_KEY);
        console.log("🚀🚀🚀 -> file: authUtils.js:65 -> authentication -> decodeUser:::", decodeUser);
        
        if(userId !== decodeUser.userId) throw new AuthFailurError('Invalid UserId 2');
        req.keyStore = keyStore;
        req.user = decodeUser;

        return next();
    } catch(error) {
        throw error
    }
})


const verifyJWT = async(token, keySecret) => {
    return await JWT.verify(token,keySecret);
}

module.exports = {
    createTokenPair,
    authentication,
    verifyJWT
};

