'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Interes } = require('../../models/Interes');



    const Register = async (event) => {
        try {
            const {interes} = JSON.parse(event['body'])

            const data = {
               interes
            }

          let  resp = await Interes.create(data);
        return generateResponse(200,{
            message: "Datos Agregados",
             Interes: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.Register = Register;