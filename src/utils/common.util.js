'use strict'

const _ = require('lodash');

const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick( object, fields )
}

const getId = async ({ object={}, prefix='' }) => {
    const id = `${prefix}${await object.count() + 1}`
    return id;
}


module.exports = {
    getInfoData,
    getId,
}