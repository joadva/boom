'use strict'

const { encryptPassword } = require('../../helpers/encryptClass');
const { sendMail } = require('../../helpers/sendMail');
const { generateResponse } = require('../../helpers/generateResponse');
const { Prestario } = require('../../models/Prestario');


    const Register = async (event) => {
        try {
            const {nombre,apellido,edad,telefono,email,password} = JSON.parse(event['body'])
            const passwordHashed = encryptPassword(password);

            const data = {
                nombre,
                apellido,
                edad,
                telefono,
                email,
                password: passwordHashed,
                roles_idroles:1,
            }
            if(edad < 18) {
                return generateResponse(200,{
                    message: "Debes ser mayor de edad para registrarte"
                })
            }


          let  resp = await Prestario.create(data);
          delete resp.dataValues.password;
      let sendmAil= await sendMail(email, `Hola, Bienvenido a Prestab Gracias por elegirnos`)
       console.log(sendmAil);
        return generateResponse(200,{
            message: "Datos Agregados",
             prestario: resp.dataValues
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.Register = Register;