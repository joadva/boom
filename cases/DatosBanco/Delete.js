'use strict';

const { DatosBancarios } = require ('../../models/DatosBancarios');
const { generateResponse } = require('../../helpers/generateResponse');

const Delete  = async (event) => {
    try{
        const {id} = event.pathParameters;
        const resp = await DatosBancarios.destroy({
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