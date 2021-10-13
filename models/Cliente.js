const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('mariadb::memory');
const {db} = require('../connection')

 const Cliente = db.define('Cliente',{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
            msg:'el email ya esta registrado'
        },
        validate: {
            isEmail: {
                msg: 'Email no Valido'
            },
            notEmpty: {
                msg: 'Ingrese un Email valido'
            }
        }

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false

    },
    telefono_numero: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    curp: {
        type: DataTypes.STRING,
        allowNull: false

    },
    sexo: {
        type: DataTypes.STRING
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    roles_idroles: {
        type: DataTypes.INTEGER
    },
    prestario_id: {
        type:DataTypes.INTEGER
    }
},{
    timestamps: false,
    sequelize,
    tableName: 'cliente'
}

);


module.exports.Cliente = Cliente;
