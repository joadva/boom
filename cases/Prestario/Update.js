'use strict'
const { generateResponse } = require('../../helpers/generateResponse');


    const Update = async (event) => {
        try {
            const {id} = event.pathParameters;

            let  buscar = await Cliente.findOne({
                where: {
                    id
                }
              });
              if (!buscar) {
                return generateResponse(200, {
                    message: "no existe el  el presario",
                })
            }

            const {nombre,apellido,email,password,telefono,edad} = JSON.parse(event['body'])

            const data = {
                nombre,
                apellido,
                edad,
                telefono,
                email,
                password,
                roles_idroles:1,
            }

          const  resp = await Cliente.update(data,
                {
                    where: {
                        id
                    }
                });
        return generateResponse(200,{
            message: "Datos Actualizado",
             cliente: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.Update = Update;