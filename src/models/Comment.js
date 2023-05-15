'use strict';
const {
  Model,Sequelize
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post,User }) {
        this.belongsTo(User, { foreignKey: 'user_id' }); //user_id ở bảng này
        this.belongsTo(Post, { foreignKey: 'post_id' });
    }
  }
  Comment.init({
    user_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
            model: 'Users',
            key: 'user_id'
        }
    },
    post_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
            model: 'Posts',
            key: 'post_id'
        }
    },
    comment: 'NVARCHAR(MAX)',
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments',
  });
  return Comment;
};