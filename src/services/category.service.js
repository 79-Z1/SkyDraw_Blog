'use strict';

const { models: { Category } } = require("../models");


class CategoryService {
    static createCategory = async ( {name} ) => {
        return await Category.create({ name })
    }

}

module.exports = CategoryService;