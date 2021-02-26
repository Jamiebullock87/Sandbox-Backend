const {DataTypes} = require('sequelize');
const db = require('../database');

const Tickets = db.define('Tickets', {
    title: {
        type: DataTypes.STRING,
        required: true,
        default: ''
    },
    identifier: {
        type: DataTypes.STRING,
        required: true,
        default: ''
    },
    client: {
        type: DataTypes.STRING,
        required: true,
        default: ''
    },
    raised: {
        type: DataTypes.STRING,
        required: true,
        default: ''
    },
    title: {
        type: DataTypes.STRING,
        required: true,
        default: ''
    },
    body: {
        type: DataTypes.STRING,
        required: true,
        default: ''
    }
}, {
    // Other options
});
module.exports = Tickets;