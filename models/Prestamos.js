const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('mariadb::memory');
const {db} = require('../connection')

 const Prestamos = db.define('prestamo',{
    cantidad_prestamo: {
        type: DataTypes.INTEGER,

    },
    tasa_interes: {
        type: DataTypes.STRING
    },
    estado_prestamo: {
        type: DataTypes.ENUM('Aceptado','Pendiente','Rechazado')
    },
    numero_meses: {
        type: DataTypes.INTEGER
    },
    fecha_comienzo: {
        type: DataTypes.DATE
    },
    fecha_finalizado: {
        type: DataTypes.DATE
    },
},{
    timestamps: false,
    sequelize,
    tableName: 'prestamo'
}
);

module.exports.Prestamos = Prestamos;