'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { NivelesCliente } = require('../../models/NivelesCliente');




    const GetAll = async (event) => {
        try {
          let  resp = await NivelesCliente.findAll();
        return generateResponse(200,{
            message: "Datos encontrados",
             Dni: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.GetAll = GetAll;