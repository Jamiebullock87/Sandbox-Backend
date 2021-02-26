const {DataTypes} = require('sequelize');
const db = require('../database');

const Client = db.define('Client', {
    identifier: {
        type: DataTypes.STRING,
        required: true,
        defaultValue: ''
    },
    name: {
        type: DataTypes.STRING,
        required: true,
        defaultValue: ''
    },
    telephone: {
        type: DataTypes.INTEGER,
        required: false
    },
    contact: {
        type: DataTypes.STRING,
        required: false,
        defaultValue: ''
    },
    directTelephone: {
        type: DataTypes.INTEGER,
        required: false
    },
    email: {
        type: DataTypes.STRING,
        required: true,
        defaultValue: ''
    },
}, {
    // Other options
});
module.exports = Client;