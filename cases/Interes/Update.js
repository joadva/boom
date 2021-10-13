'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Interes } = require('../../models/Interes');


    const Update = async (event) => {
        try {
            const {id} = event.pathParameters;
            let  buscar = await Interes.findOne({
                where: {
                    id
                }
              });
              if (!buscar) {
                return generateResponse(200, {
                    message: "no se encontro el Interes",
                })
            }

            const {interes} = JSON.parse(event['body'])

            const data = {
               interes
            }

          let  resp = await Interes.update(data,
                {
                    where: {
                        id
                    }
                });

        return generateResponse(200,{
            message: "Datos Modificados",
             interes: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.Update = Update;