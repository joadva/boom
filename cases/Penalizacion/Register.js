'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Penalizacion } = require('../../models/Penalizacion');


    const Register = async (event) => {
        try {
            const {motivo,cantidad,pagos_id} = JSON.parse(event['body'])

            const data = {
                motivo,
                cantidad,
                pagos_id
            }

          let  resp = await Penalizacion.create(data);
        return generateResponse(200,{
            message: "Penalizacion Agregada",
             penalizacion: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.Register = Register;