'use strict'

const { generateResponse } = require('../../helpers/generateResponse');

const { Interes } = require('../../models/Interes');


    const GetAll = async (event) => {
        try {
          let  resp = await Interes.findAll();
        return generateResponse(200,{
            message: "Interes encontrados",
             interes: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.GetAll = GetAll;