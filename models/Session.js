const {DataTypes} = require('sequelize');
const db = require('../database');

const Session = db.define('Session', {
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now
    },
    useragent: {
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        required: true
    },
    firstName: {
        type: DataTypes.STRING,
        required: false
    },
    lastName: {
        type: DataTypes.STRING,
        required: false
    },
    image: {
        type: DataTypes.STRING,
        required: false
    },
    whatTheme: {
        type: DataTypes.STRING,
        required: false
    },
    ip: {
        type: DataTypes.STRING,
        required: true
    },
    token: {
        type: DataTypes.STRING,
        required: true
    },
    valid: {
        type: DataTypes.BOOLEAN,
        required: true
    }
}, {
    // Other options
});

module.exports = Session;