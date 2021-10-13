'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Domicilio } = require('../../models/Domicilio');


    const Update = async (event) => {
        try {
            const {id} = event.pathParameters;
            const {calle,Numero_Exterior,Numero_Interior,colonia,ciudad,estado,codigo_postal} = JSON.parse(event['body'])

            const data = {
                calle,
                Numero_Exterior,
                Numero_Interior,
                colonia,
                ciudad,
                estado,
                codigo_postal,
            }
          let  resp = await Domicilio.update(data,
                {
                    where: {
                        id
                    }
                });
        return generateResponse(200,{
            message: "Domicilio Actualizado",
             cliente: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.Update = Update;