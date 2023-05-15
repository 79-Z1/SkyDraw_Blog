'use strict';
const {
    Model,Sequelize
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class KeyToken extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    KeyToken.init({
        refresh_token: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'user_id'
            }
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'KeyToken',
        tableName: 'Key_tokens',
    });
    return KeyToken;
};