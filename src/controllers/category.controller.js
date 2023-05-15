'use strict';
const { CREATED, OK, SuccessResponse } = require("../core/success.response");
const Category = require("../services/category.service");

class CategoryController {
    
    createCategory = async(req, res, next) => {
        return new SuccessResponse({
            message: 'create category success',
            metadata: await Category.createCategory(req.body)
        }).send(res);
    }
}

module.exports = new CategoryController();