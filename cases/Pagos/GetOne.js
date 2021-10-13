'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Pagos } = require('../../models/Pagos');



    const GetOne = async (event) => {
        try {
            const {id} = event.pathParameters;
          let  resp = await Pagos.findOne({
            where: {
                id
            }
          });
          if (!resp) {
            return generateResponse(200, {
                message: "No se encontro ningun Pago",
            })
        }
        return generateResponse(200,{
            message: "Pagos encontrados",
             Pago: resp
        })


        }catch(e){
            return generateResponse(500,{
                message:"error en la peticion",

            })

    }
}
module.exports.GetOne = GetOne;