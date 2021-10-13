'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { NivelesCliente } = require('../../models/NivelesCliente');


    const Update = async (event) => {
        try {
            const {id} = event.pathParameters;

            let  buscar = await NivelesCliente.findOne({
                where: {
                    id
                }
              });
              if (!buscar) {
                return generateResponse(200, {
                    message: "no existe el  el nivel",
                })
            }

            const {nombre_nivel,cantidad_inicial,cantidad_final} = JSON.parse(event['body'])

            const data = {
                nombre_nivel,cantidad_inicial,cantidad_final
            }
          const  resp = await NivelesCliente.update(data,
                {
                    where: {
                        id
                    }
                });
                if(cantidad_inicial < cantidad_final){
                    return generateResponse(200, {
                        message: "el nivel Inicial debe ser menor al Final",
                    })
                }

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