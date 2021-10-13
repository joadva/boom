const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('mariadb::memory');
const {db} = require('../connection')

 const NivelesCliente = db.define('niveles_cliente',{

    nombre_nivel: {
        type: DataTypes.STRING
    },
    cantidad_inicial: {
        type: DataTypes.INTEGER
    },
    cantidad_final: {
        type: DataTypes.INTEGER
    },


},{
    timestamps: false,
    sequelize,
    tableName: 'niveles_cliente'
}
);

module.exports.NivelesCliente = NivelesCliente;