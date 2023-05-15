'use strict';
const {
  Model, Sequelize
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      console.log('User associated with: Post');
      this.hasMany(Post, {
          foreignKey: 'user_id',
          onDelete: 'CASCADE'
      });
    }
  }
  User.init({
    user_id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    username: 'VARCHAR(255)',
    email: 'VARCHAR(255)',
    password: 'NVARCHAR(255)',
    point: 'INT',
    role: 'BIT'
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  });
  return User;
};

