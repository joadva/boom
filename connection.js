require('dotenv').config
const {Sequelize} = require('sequelize');


const db = new Sequelize('prestamodb','admin','caballo123', {
  host: 'prestamo.cearxsjn5jk0.us-east-1.rds.amazonaws.com',
  dialect: 'mariadb',
  dialectModule: require('mariadb')
  });


module.exports.db = db;