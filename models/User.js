const {DataTypes} = require('sequelize');
const db = require('../database');

const User = db.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    whatTheme: {
        type: DataTypes.STRING,
        required: false,
        defaultValue: 'dark',
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    isSuper: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        required: true,
        allowNull: false
    }
}, {
    // tableName: 'Users'
});

console.log(User === db.models.User); // true

module.exports = User;