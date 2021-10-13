const bcrypt = require('bcryptjs');
const saltRounds = 10;

const encryptPassword = (password) => {
  try{
    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordEncrypt = bcrypt.hashSync(password, salt);
    return passwordEncrypt;
  }catch(e) {
    throw new Error("Error when generate the password");
  }
}

const comparePassword = (password,passwordFromDB) => {
    const isCorrectPassword = bcrypt.compareSync(password, passwordFromDB);
    return isCorrectPassword;
}

module.exports = {
    encryptPassword,
    comparePassword,

}