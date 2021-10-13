'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Prestario } = require('../../models/Prestario');


    const ForgotPassword = async (event) => {
        try {

            const {email} = event.pathParameters;

              if (email == null) {
                return generateResponse(200, {
                    message: "Correo requerido",
                })
            }

            let buscaremail = await Prestario.findOne({email});
                console.log(buscaremail);
                    return generateResponse(200,{
            message: "email encontrados",
             forgot: buscaremail
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.ForgotPassword = ForgotPassword;