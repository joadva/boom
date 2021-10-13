'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
 const { Domicilio } = require ('../../models/Domicilio');


    const GetAll = async (event) => {
        try {
          let  resp = await Domicilio.findAll();
        return generateResponse(200,{
            message: "Domicilio encontrado",
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