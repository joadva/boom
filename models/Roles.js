const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('mariadb::memory');
const {db} = require('../connection')

 const Roles = db.define('roles',{

    rol: {
        type: DataTypes.ENUM('Admin','Cliente')
    },

},{
    timestamps: false,
    sequelize,
    tableName: 'roles'
}
);

module.exports.Roles = Roles;