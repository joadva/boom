const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('mariadb::memory');
const {db} = require('../connection')

 const Interes = db.define('interes',{
    interes: {
        type: DataTypes.STRING,

    },
},{
    timestamps: false,
    sequelize,
    tableName: 'interes'
}
);

module.exports.Interes = Interes;