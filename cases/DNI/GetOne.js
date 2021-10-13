'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const {  DNi } = require('../../models/DNI');



    const GetOne = async (event) => {
        try {
            const {id} = event.pathParameters;
          let  resp = await DNi.findOne({
            where: {
                id
            }
          });
          if (!resp) {
            return generateResponse(200, {
                message: "no existe el DNI",
            })
        }
        return generateResponse(200,{
            message: "DNI encontrado",
             Dni: resp
        })


        }catch(e){
            return generateResponse(500,{
                message:"error en la peticion",

            })

    }
}
module.exports.GetOne = GetOne;