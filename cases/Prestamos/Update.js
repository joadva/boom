'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { DNi } = require('../../models/DNI');


    const Update = async (event) => {
        try {
            const {id} = event.pathParameters;

            let  buscar = await DNi.findOne({
                where: {
                    id
                }
              });
              if (!buscar) {
                return generateResponse(200, {
                    message: "no existe el  DNI",
                })
            }

            const {DNI,frente,reverse} = JSON.parse(event['body'])

            const data = {
                DNI,
                frente,
                reverse,
            }

          const  resp = await DNi.update(data,
                {
                    where: {
                        id
                    }
                });

        return generateResponse(200,{
            message: "Datos Agregados",
             Dni: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.Update = Update;