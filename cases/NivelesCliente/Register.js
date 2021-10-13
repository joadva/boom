'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { NivelesCliente } = require('../../models/NivelesCliente');



    const Register = async (event) => {
        try {
            const {nombre_nivel,cantidad_inicial,cantidad_final} = JSON.parse(event['body'])

            const data = {
                nombre_nivel,cantidad_inicial,cantidad_final
            }
            if(cantidad_inicial < cantidad_final){
                return generateResponse(200, {
                    message: "el nivel Inicial debe ser menor a la Final",
                })
            }

          let  resp = await NivelesCliente.create(data);

        return generateResponse(200,{
            message: "Datos Agregados",
             Nivel_de_Cliente: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.Register = Register;