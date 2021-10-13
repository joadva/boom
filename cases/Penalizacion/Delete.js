const { generateResponse } = require('../../helpers/generateResponse');
const {  DNi } = require('../../models/DNI');

const Delete  = async (event) => {
    try{
        const {id} = event.pathParameters;
        let  buscar = await DNi.findOne({
            where: {
                id
            }
          });
          if (!buscar) {
            return generateResponse(200, {
                message: "no se existe el  DNI",
            });
        }
        const resp = await DNi.destroy({
            where: {
                id
            }
        });
    if(!resp) return generateResponse(500, {message: "No se puede eliminar los datos"});
        return generateResponse(200, {message: "Datos eliminado"});
    }catch(e) {
        return generateResponse(500, {message: "Error interno en la api", error: e.stack});
    }

};

module.exports.Delete = Delete;