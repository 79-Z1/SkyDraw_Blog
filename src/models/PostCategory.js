'use strict';
const {
    Model,Sequelize
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PostCategory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    PostCategory.init({
        post_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            onDelete: 'CASCADE',
            references: {
                model: 'Posts',
                key: 'post_id'
            }
        },
        category_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            onDelete: 'CASCADE',
            references: {
                model: 'Categories',
                key: 'category_id'
            }
        },
    }, {
        sequelize,
        modelName: 'PostCategory',
        tableName: 'Post_categories',
        timestamps: true
    });
    return PostCategory;
};