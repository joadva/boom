'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Pagos } = require('../../models/Pagos');



    const GetAll = async (event) => {
        try {
          let  resp = await Pagos.findAll();
        return generateResponse(200,{
            message: "Pagos encontrados",
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