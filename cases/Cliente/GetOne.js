'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Cliente } = require('../../models/Cliente');



    const GetOne = async (event) => {
        try {
            const {id} = event.pathParameters;
          let  resp = await Cliente.findOne({
            where: {
                id
            }
          });
          if (!resp) {
            return generateResponse(200, {
                message: "no existe el Cliente",
            })
        }
        return generateResponse(200,{
            message: "Cliente encontrado",
             cliente: resp
        })


        }catch(e){
            return generateResponse(500,{
                message:"error en la peticion",

            })

    }
}
module.exports.GetOne = GetOne;