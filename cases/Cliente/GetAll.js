'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
 const { Cliente } = require ('../../models/Cliente');


    const GetAll = async (event) => {
        try {
          let  resp = await Cliente.findAll();
        return generateResponse(200,{
            message: "Clientes encontrados",
             cliente: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.GetAll = GetAll;