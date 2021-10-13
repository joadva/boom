'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Pagos } = require('../../models/Pagos');


    const Update = async (event) => {
        try {
            const {id} = event.pathParameters;
            const {cantidad,dia_pago} = JSON.parse(event['body'])

            const data = {
                cantidad,
                dia_pago,
            }
        const resp = await Pagos.update(data, {
            where:{
                id
            }
        });

        if(resp === 0){
            return generateResponse(500, {message: "No se pudo actualizar"})
        }
        return generateResponse(200,{
            message: "Datos Agregados",
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