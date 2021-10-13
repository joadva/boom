'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Pagos } = require('../../models/Pagos');



    const Register = async (event) => {
        try {
            const {cantidad,dia_pago} = JSON.parse(event['body'])

            const data = {
                cantidad,
                dia_pago,
            }

          let  resp = await Pagos.create(data);
        return generateResponse(200,{
            message: "Datos Agregados",
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