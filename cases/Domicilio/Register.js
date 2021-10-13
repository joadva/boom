'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Domicilio } = require('../../models/Domicilio');


    const Register = async (event) => {
        try {
            const {calle,Numero_Exterior,Numero_Interior,colonia,ciudad,estado,codigo_postal} = JSON.parse(event['body'])

            const data = {
                calle,
                Numero_Exterior,
                Numero_Interior,
                colonia,
                ciudad,
                estado,
                codigo_postal,
                cliente_id: 3
            }

          let  resp = await Domicilio.create(data);
        return generateResponse(200,{
            message: "Domicilio Agregado",
             domicilio: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.Register = Register;