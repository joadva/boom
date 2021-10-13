'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Roles } = require('../../models/Roles');




    const GetAll = async (event) => {
        try {
          let  resp = await Roles.findAll();
        return generateResponse(200,{
            message: "Roles encontrados",
             Rol: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.GetAll = GetAll;