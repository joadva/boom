'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Referencias } = require('../../models/Referencias');



    const Register = async (event) => {
        try {
            const { nombre_referencia,apellido_referencia,telefono,tipo_referencia} = JSON.parse(event['body'])

            const data = {
                nombre_referencia,apellido_referencia,telefono,tipo_referencia
            }

          let  resp = await Referencias.create(data);

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
module.exports.Register = Register;