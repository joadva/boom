'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
 const { DatosBancarios } = require ('../../models/DatosBancarios');


    const Update = async (event) => {
        try {
            const {id} = event.pathParameters;
            const {num_cuenta,nombre_cuenta,banco} = JSON.parse(event['body'])

            const data = {
                num_cuenta,
                nombre_cuenta,
                banco,
            }

        const resp = await DatosBancarios.update(data, {
            where:{
                id
            }
        });

        if(resp[0] === 0){
            return generateResponse(500, {message: "No se pudo actualizar"})
        }
        return generateResponse(200,{
            message: "Datos Modificados",
             Banco: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.Update = Update;