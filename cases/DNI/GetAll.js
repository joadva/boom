const { generateResponse } = require('../../helpers/generateResponse');
const {  DNi } = require('../../models/DNI');

    const GetAll = async (event) => {
        try {
          let  resp = await DNi.findAll();
        return generateResponse(200,{
            message: "DNI encontrados",
             Dni: resp
        });

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            });

    }
};
module.exports.GetAll = GetAll;