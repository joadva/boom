const { generateResponse } = require('../../helpers/generateResponse');
const { Penalizacion } = require('../../models/Penalizacion');

    const GetAll = async (event) => {
        try {
          let  resp = await Penalizacion.findAll();
        return generateResponse(200,{
            message: "DNI encontrados",
             penalizacion: resp
        });

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            });

    }
};
module.exports.GetAll = GetAll;