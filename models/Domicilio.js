const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('mariadb::memory');
const {db} = require('../connection');

 const Domicilio = db.define('datos_bancarios',{
    calle: {
        type: DataTypes.STRING,

    },
    Numero_Exterior: {
        type: DataTypes.INTEGER,
    },
    Numero_Interior: {
        type: DataTypes.INTEGER,
    },
    colonia: {
        type: DataTypes.STRING
    },
    ciudad: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    },
    codigo_postal: {
        type: DataTypes.INTEGER
    },
    cliente_id: {
        type: DataTypes.INTEGER
    }
},{
    timestamps: false,
    sequelize,
    tableName: 'domicilio'
}
);



module.exports.Domicilio = Domicilio;