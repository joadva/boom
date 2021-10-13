'use strict';


const { generateResponse } = require('../../helpers/generateResponse');
const { Interes } = require('../../models/Interes');

const Delete  = async (event) => {
    try{
        const {id} = event.pathParameters;
        const resp = await Interes.destroy({
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