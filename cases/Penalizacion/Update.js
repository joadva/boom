const { generateResponse } = require('../../helpers/generateResponse');
const { DNi } = require('../../models/DNI');

    const Update = async (event) => {
        try {
            const {id} = event.pathParameters;

            let  buscar = await DNi.findOne({
                where: {
                    id
                }
              });
              if (!buscar) {
                return generateResponse(200, {
                    message: "no existe el  la penalizacion",
                });
            }

            const {motivo,cantidad} = JSON.parse(event['body']);

            const data = {
                motivo,
                cantidad
            };

          const  resp = await DNi.update(data,
                {
                    where: {
                        id
                    }
                });

        return generateResponse(200,{
            message: "Datos Agregados",
             penalizacion: resp
        });

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            });

    }
};
module.exports.Update = Update;