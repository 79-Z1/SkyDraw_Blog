'use strict';
const {
    Model, Sequelize
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Parameter extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }
    Parameter.init({
        id: {
            type: 'INT',
            autoIncrement: true,
            primaryKey: true
        },
        name: 'NVARCHAR(255)',
        unit: 'NVARCHAR(255)',
        value: 'NVARCHAR(255)',
        status: 'BIT'
    }, {
        sequelize,
        modelName: 'Parameter',
        tableName: 'Parameters',
    });
    return Parameter;
};