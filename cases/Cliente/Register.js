'use strict'
const { encryptPassword } = require('../../helpers/encryptClass');
const AwsConfig = require('../../helpers/AwsConfig');
const { generateResponse } = require('../../helpers/generateResponse');
const { Cliente } = require('../../models/Cliente');

    const Register = async (event) => {
        try {
            AwsConfig.initAWS ();
            const {nombre,apellido,email,password,telefono_numero,curp,sexo,edad} = JSON.parse(event['body'])
            AwsConfig.setCognitoAttributeList(email,'');
            const passwordHashed = encryptPassword(password);
            const data = {
                nombre,
                apellido,
                email,
                password: passwordHashed,
                telefono_numero,
                curp,
                sexo,
                edad,
                roles_idroles:2,
                prestario_id:1
            }
            if(edad < 18) {
                return generateResponse(200,{
                    message: "Debes ser mayor de edad para registrarte"
                })
            }
            let  validationEmail = await Cliente.findOne({
                where: {
                    email
                }
              });
              if (validationEmail) {
                return generateResponse(200, {
                    message:"Correo ya registrado",
                })
            }
            let  validationCurp = await Cliente.findOne({
                where: {
                    curp
                }
              });
              if (validationCurp) {
                return generateResponse(200, {
                    message:"Curp ya registrado",
                })
            }

            let user = await cognitoSignup( {email, password} );
            console.log(user)

          let  resp = await Cliente.create(data);
          delete resp.dataValues.password;



        return generateResponse(200,{
            message: "Datos Agregados",
             cliente : resp.dataValues
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}

const cognitoSignup = ({email, password}) => {
    return new Promise ((resolve, reject) => {
        AwsConfig.getUserPool().signUp(email, password, AwsConfig.getCognitoAttributeList(), null, (err, result) => {
            if(err) reject(err);
            resolve(result)
        });
    })
}
module.exports.Register = Register;