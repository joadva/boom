const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('mariadb::memory');
const {db} = require('../connection')

 const Prestario = db.define('prestario',{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    telefono: {
        type: DataTypes.INTEGER,
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
    roles_idroles: {
        type: DataTypes.INTEGER
    },
},{
    timestamps: false,
    sequelize,
    tableName: 'prestario'
}
);

module.exports.Prestario = Prestario;