'use strict'

const { comparePassword } = require('../../helpers/encryptClass');
const { generateResponse } = require('../../helpers/generateResponse');
const { Prestario } = require('../../models/Prestario');
const { sign } = require("jsonwebtoken");



    const Login = async (event,context) => {
        try {
            const {email,password} = JSON.parse(event['body'])

     const resp = await Prestario.findOne({where: {email}});
     if (resp === null) return generateResponse(403,{message:'correo o password incorecta'})
    const {dataValues: prestario}
     const isValid = comparePassword(password,prestario.password);
     context.end();
    if(isValid){
     const jsontoken = sign({result:user},process.env.JWT_SECRET,{
         expiresIn : "1h"
     })
     delete prestario.password;
     return generateResponse(200,{success: true ,
        message: "login ",
        token: jsontoken,
        prestario
    })

}else return generateResponse(403,{message: ' correo o contraseña incorrecta'})
        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.Login = Login;