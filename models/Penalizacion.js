const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('mariadb::memory');
const {db} = require('../connection');

 const Penalizacion = db.define('penalizacion',{
    motivo: {
        type: DataTypes.STRING,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        require: true
    },
    pagos_id: {
        type: DataTypes.INTEGER
    },
},{
    timestamps: false,
    sequelize,
    tableName: 'penalizacion'
}
);

module.exports.Penalizacion = Penalizacion;