'use strict';
const { db: {sequelize} } = require('../models/index');


class Database {
    constructor() {
        this.connect()
    }

    async connect(type = 'mssql') {
        // await sequelize.sync({ force: true });
        // console.log("Database synced");
        await sequelize.authenticate();
        console.log('Database saved');
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMSSQL = Database.getInstance();
module.exports = instanceMSSQL;