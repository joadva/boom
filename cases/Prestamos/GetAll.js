'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Prestamos } = require('../../models/Prestamos');




    const GetAll = async (event) => {
        try {
          let  resp = await Prestamos.findAll();
        return generateResponse(200,{
            message: "prestamos encontrados",
             Prestamo: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.GetAll = GetAll;