const { generateResponse } = require('../../helpers/generateResponse');
const { Penalizacion } = require('../../models/Penalizacion');

    const GetOne = async (event) => {
        try {
            const {id} = event.pathParameters;
          let  resp = await Penalizacion.findOne({
            where: {
                id
            }
          });
          if (!resp) {
            return generateResponse(200, {
                message: "no existe el dato",
            });
        }
        return generateResponse(200,{
            message: "Penalizacion encontrada",
             penalizacion: resp
        });


        }catch(e){
            return generateResponse(500,{
                message:"error en la peticion",

            });

    }
};
module.exports.GetOne = GetOne;