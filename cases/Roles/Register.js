'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Roles } = require('../../models/Roles');


    const Register = async (event) => {
        try {
            const {rol} = JSON.parse(event['body'])

            const data = {
               rol,
            }

          let  resp = await Roles.create(data);
        return generateResponse(200,{
            message: "Datos Agregados",
             Rol: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.Register = Register;