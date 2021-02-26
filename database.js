const { Sequelize } = require('sequelize');

const db = new Sequelize('piedpiper', 'postgres', 'postgres', {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false
});


db.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch((error) => {
    console.error('Unable to connect to the database:', error);
})

module.exports = db;