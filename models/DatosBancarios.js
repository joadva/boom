const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('mariadb::memory');
const {db} = require('../connection')

 const DatosBancarios = db.define('datos_bancarios',{
    num_cuenta: {
        type: DataTypes.INTEGER,
        unique: true,
        require:true

    },
    nombre_cuenta: {
        type: DataTypes.STRING
    },
    banco: {
        type: DataTypes.STRING
    },
    cliente_id :{
        type:  DataTypes.INTEGER
    }
},{
    timestamps: false,
    sequelize,
    tableName: 'datos_bancarios'
}
);

module.exports.DatosBancarios = DatosBancarios;