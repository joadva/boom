'use strict';
const { generateResponse } = require('../../helpers/generateResponse');
const { Cliente } = require('../../models/Cliente');


const Delete  = async (event) => {
    try{
        const {id} = event.pathParameters;
        let  buscar = await Cliente.findOne({
            where: {
                id
            }
          });
          if (!buscar) {
            return generateResponse(200, {
                message: "No se puede eliminar porque no existe Cliente",
            })
        }
        const resp = await Cliente.destroy({
            where: {
                id
            }
        })
        if(!resp) return generateResponse(500, {message: "No se puede eliminar los datos"})
        return generateResponse(200, {message: "Cliente eliminado"})
    }catch(e) {
        return generateResponse(500, {message: "Error interno en la api", error: e.stack})
    }

}

module.exports.Delete = Delete;