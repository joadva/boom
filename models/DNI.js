const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('mariadb::memory');
const {db} = require('../connection');

 const DNi = db.define('DNI',{
    DNI: {
        type: DataTypes.ENUM('INE','PASAPORTE','LICENCIA MANEJO')

    },
    frente: {
        type: DataTypes.STRING
    },
    reverse: {
        type: DataTypes.STRING
    },

},{
    timestamps: false,
    sequelize,
    tableName: 'DNI'
}
);

module.exports.DNi = DNi;