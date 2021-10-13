'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Referencias } = require('../../models/Referencias');




    const GetAll = async (event) => {
        try {
          let  resp = await Referencias.findAll();
        return generateResponse(200,{
            message: "Datos encontrados",
             Referencia: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.GetAll = GetAll;