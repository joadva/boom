'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Referencias } = require('../../models/Referencias');


    const Update = async (event) => {
        try {
            const {id} = event.pathParameters;

            let  buscar = await Referencias.findOne({
                where: {
                    id
                }
              });
              if (!buscar) {
                return generateResponse(200, {
                    message: "no existe la referencia",
                })
            }

            const { nombre_referencia,apellido_referencia,tipo_referencia} = JSON.parse(event['body'])

            const data = {
                nombre_referencia,
                apellido_referencia,
                tipo_referencia
                      }
          const  resp = await Referencias.update(data,
                {
                    where: {
                        id
                    }
                });

        return generateResponse(200,{
            message: "Datos Agregados",
             Referencia: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.Update = Update;