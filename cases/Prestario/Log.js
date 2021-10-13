const { Prestario } = require("../../models/Prestario")
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const { generateResponse } = require('../../helpers/generateResponse');

const Log = async (event) => {

    try {
        const {email, password} = JSON.parse(event['body']);
        const response = await Prestario.findOne({where: {email}});

        if(response === null) return  generateResponse(403, {message: 'User or password incorrect'})

        if(response) {
            const iguales = bcrypt.compareSync({password}, response.password);
            if (iguales) {

            }
        }


    }catch(e){
        return generateResponse(500, {message:"Internal error in APIS"});
}
}

module.exports.Log = Log;
