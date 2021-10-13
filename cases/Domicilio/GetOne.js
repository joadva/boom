'use strict'

const { generateResponse } = require('../../helpers/generateResponse');

const { Domicilio } = require('../../models/Domicilio');


    const GetOne = async (event) => {
        try {
            const {id} = event.pathParameters;
          let  resp = await Domicilio.findOne({
            where: {
                id
            }
          });
          if (!resp) {
            return generateResponse(200, {
                message: "no se encontro el domicilio",
            })
        }
        return generateResponse(200,{
            message: "Domicilio encontradoo",
             cliente: resp
        })
       

        }catch(e){
            return generateResponse(500,{
                message:"error en la peticion",
                
            })

    }
}
module.exports.GetOne = GetOne;