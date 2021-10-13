'use strict'
const { generateResponse } = require('../../helpers/generateResponse');
const { Cliente } = require('../../models/Cliente');
const { encryptPassword } = require('../../helpers/encryptClass');

    const Update = async (event) => {
        try {
            const {id} = event.pathParameters;
            const passwordHashed = encryptPassword(password);
            let  buscar = await Cliente.findOne({
                where: {
                    id
                }
              });
              if (!buscar) {
                return generateResponse(200, {
                    message: "no existe el  el Cliente",
                })
            }

            const {nombre,apellido,email,password,telefono_numero,curp,sexo,edad} = JSON.parse(event['body'])

            const data = {
                nombre,
                apellido,
                email,
                password,
                telefono_numero,
                curp,
                sexo,
                edad,
            }

          const  resp = await Cliente.update(data,
                {
                    where: {
                        id
                    }
                });
        delete resp.dataValues.password;
        return generateResponse(200,{
            message: "Datos Actualizado",
             cliente: resp.dataValues
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.Update = Update;