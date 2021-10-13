'use strict'

const { generateResponse } = require('../../helpers/generateResponse');

const { Interes } = require('../../models/Interes');


    const GetOne = async (event) => {
        try {
            const {id} = event.pathParameters;
          let  resp = await Interes.findOne({
            where: {
                id
            }
          });
          if (!resp) {
            return generateResponse(200, {
                message: "no se encontro Interes",
            })
        }
        return generateResponse(200,{
            message: "Interes encontrados",
             interes: resp
        })
       

        }catch(e){
            return generateResponse(500,{
                message:"error en la peticion",
                
            })

    }
}
module.exports.GetOne = GetOne;