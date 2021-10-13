'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Prestamos } = require('../../models/Prestamos');



    const GetOne = async (event) => {
        try {
            const {id} = event.pathParameters;
          let  resp = await Prestamos.findOne({
            where: {
                id
            }
          });
          if (!resp) {
            return generateResponse(200, {
                message: "no existe el Prstamo",
            })
        }
        return generateResponse(200,{
            message: "Prestamo encontrado",
             Prestamo: resp
        })


        }catch(e){
            return generateResponse(500,{
                message:"error en la peticion",

            })

    }
}
module.exports.GetOne = GetOne;