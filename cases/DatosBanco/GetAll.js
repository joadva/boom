'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
 const { DatosBancarios } = require ('../../models/DatosBancarios');


    const GetAll = async (event) => {
        try {
          let  resp = await DatosBancarios.findAll();
        return generateResponse(200,{
            message: "Datos Bancarios encontrados",
             Banco: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.GetAll = GetAll;