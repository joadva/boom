'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Roles } = require('../../models/Roles');


    const Update = async (event) => {
        try {
            const {id} = event.pathParameters;
            const {rol} = JSON.parse(event['body'])

            const data = {
                rol
              }

          let  resp = await Roles.update(data,
                {
                    where: {
                        id
                    }
                });
         if(resp[0] === 0){
                    return generateResponse(200, {message: "No se pudo actualizar"})
                }
        return generateResponse(200,{
            message: "Datos Actualizados",
             Rol: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.Update = Update;