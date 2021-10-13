'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
 const { DatosBancarios } = require ('../../models/DatosBancarios');


    const Register = async (event) => {
        try {
            const {num_cuenta,nombre_cuenta,banco} = JSON.parse(event['body'])

            const data = {
                num_cuenta,
                nombre_cuenta,
                banco,
                cliente_id:3
            }

          let  resp = await DatosBancarios.create(data);
        return generateResponse(200,{
            message: "Datos Bancarios Agregados",
             cliente: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.Register = Register;