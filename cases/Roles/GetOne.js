'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Roles } = require('../../models/Roles');

    const GetOne = async (event) => {
        try {
            const {id} = event.pathParameters;
          let  resp = await Roles.findOne({
            where: {
                id
            }
          });
          if (!resp) {
            return generateResponse(200, {
                message: "no se encontro el Rol",
            })
        }
        return generateResponse(200,{
            message: "Rol encontrado",
             Rol: resp
        })


        }catch(e){
            return generateResponse(500,{
                message:"error en la peticion",

            })

    }
}
module.exports.GetOne = GetOne;