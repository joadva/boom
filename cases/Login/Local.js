
const { comparePassword } = require('../../helpers/encryptClass');
const { sign } = require("jsonwebtoken");

const {generateResponse} = require('../../helpers/generateResponse');
const { Cliente } = require('../../models/Cliente');

const Login  = async ( event, context ) => {
  try{
    const {email, password} = JSON.parse(event['body']);
    const response = await   Cliente.findOne({where: {email}});
    if(response === null) return  generateResponse(403, {message: 'User or password incorrect'})
    const { dataValues: user } = response;
    const isValid = comparePassword(password, user.password);
    context.end();
    if(isValid) {
      const jsontoken = sign({ result: user }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      });
      delete user.password;

      return generateResponse(200, { success: true,
        message: "login successfully",
        token: jsontoken,
        user
      })
    }else return generateResponse(403, {message: 'User or password incorrect'})
  }catch(e) {
    context.end();
    return generateResponse(500, {message:"Internal error in APIS"});
  }
}

module.exports.Login = Login;