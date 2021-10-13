'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Referencias } = require('../../models/Referencias');



    const GetOne = async (event) => {
        try {
            const {id} = event.pathParameters;
          let  resp = await Referencias.findOne({
            where: {
                id
            }
          });
          if (!resp) {
            return generateResponse(200, {
                message: "no existe el dato buscado",
            })
        }
        return generateResponse(200,{
            message: "Nivel encontrado",
             Referencia: resp
        })


        }catch(e){
            return generateResponse(500,{
                message:"error en la peticion",

            })

    }
}
module.exports.GetOne = GetOne;