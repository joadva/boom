'use strict';


const { generateResponse } = require('../../helpers/generateResponse');
const { NivelesCliente } = require('../../models/NivelesCliente');


const Delete  = async (event) => {
    try{
        const {id} = event.pathParameters;
        let  buscar = await NivelesCliente.findOne({
            where: {
                id
            }
          });
          if (!buscar) {
            return generateResponse(200, {
                message: "no se existe el  Nivel",
            })
        }
        const resp = await NivelesCliente.destroy({
            where: {
                id
            }
        })
        if(!resp) return generateResponse(500, {message: "No se puede eliminar los datos"})
        return generateResponse(200, {message: "Datos eliminado"})
    }catch(e) {
        return generateResponse(500, {message: "Error interno en la api", error: e.stack})
    }

}

module.exports.Delete = Delete;