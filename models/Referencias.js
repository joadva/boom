const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('mariadb::memory');
const {db} = require('../connection')

 const Referencias = db.define('referencias',{
    nombre_referencia: {
        type: DataTypes.STRING,

    },
    apellido_referencia: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    tipo_referencia: {
        type: DataTypes.ENUM('Amigo',"Familiar",'Otro')
    },
    cliente_id:{
        type: DataTypes.INTEGER
    }
},{
    timestamps: false,
    sequelize,
    tableName: 'referencias'
}
);

module.exports.Referencias = Referencias;