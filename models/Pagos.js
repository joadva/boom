const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('mariadb::memory');
const {db} = require('../connection')

 const Pagos = db.define('pagos',{
    cantidad: {
        type: DataTypes.STRING,

    },
    dia_pago: {
        type: DataTypes.DATE
    },
    prestamo_id_prestamo: {
        type: DataTypes.INTEGER
    }
},{
    timestamps: false,
    sequelize,
    tableName: 'pagos'
}
);

module.exports.Pagos = Pagos;