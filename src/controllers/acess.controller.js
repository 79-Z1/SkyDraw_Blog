'use strict';

const { CREATED, OK, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
    
    logout = async(req, res, next) => {
        return new SuccessResponse({
            message: 'logout success',
            metadata: await AccessService.logout(req.keyStore)
        }).send(res);
    }

    signUp = async (req, res, next) => {
        return new CREATED({
            message: "User created successfully",
            metadata: await AccessService.signUp(req.body)
        }).send(res);
    }

    logIn = async (req, res, next) => {
        return new OK({
            message: "Login successful",
            metadata: await AccessService.logIn(req.body)
        }).send(res);
    }

    showSignUp(req, res, next) {
        res.render("pages/auth/signup", {
			layout: false,
        });
    }

    showLogIn(req, res, next) {
        res.render("pages/auth/login", {
			layout: false,
        });
    }
}

module.exports = new AccessController();