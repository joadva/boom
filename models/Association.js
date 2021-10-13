const { Cliente } = require("../models/Cliente");
const { Domicilio } = require("./Domicilio");
const {DatosBancarios} = require("./DatosBancarios");




// cliente domicilio
Cliente.hasOne(Domicilio,{as:"domicilio", foreignKey: "cliente_id"});

Domicilio.belongsTo(Cliente,{as:" cliente", foreignKey: "cliente_id"})


// cliente referencias
Cliente.hasOne(DatosBancarios ,{as:"datos_bancarios", foreignKey: "cliente_id"});

DatosBancarios.belongsTo(Cliente,{as:" cliente", foreignKey: "cliente_id"})





