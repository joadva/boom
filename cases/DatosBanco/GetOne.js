'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
 const { DatosBancarios } = require ('../../models/DatosBancarios');


    const GetOne = async (event) => {
        try {
            const {id} = event.pathParameters;
          let  resp = await DatosBancarios.findOne({
            where: {
                id
            }
          });
          if (!resp) {
            return generateResponse(200, {
                message: "no se encontro datos_bancarios",
            })
        }
        return generateResponse(200,{
            message: "Datos Bancarios encontrados",
             cliente: resp
        })


        }catch(e){
            return generateResponse(500,{
                message:"error en la peticion",

            })

    }
}
module.exports.GetOne = GetOne;