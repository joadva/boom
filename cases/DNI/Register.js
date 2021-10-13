'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { DNi } = require('../../models/DNI');



    const Register = async (event) => {
        try {
            const {DNI,frente,reverse} = JSON.parse(event['body'])

            const data = {
                DNI,
                frente,
                reverse,
            }

          let  resp = await DNi.create(data);
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
module.exports.Register = Register;