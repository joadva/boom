const AwsConfig = require('./AwsConfig2');
const register2 =async (event) => {
    try {
        AwsConfig.initAWS ();
        let { email, password, nombre,apellido,telefono,edad,roles} = JSON.parse(event.body);
        AwsConfig.setCognitoAttributeList(email,'');

        let user = await cognitoSignup( {email, password,nombre,apellido,telefono,edad,roles} );
        console.log(user)
        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                    message: 'Register done',
                }
            )
        }
    } catch(e) {
        console.log(e)
        return {
            statusCode: 500,
            body: JSON.stringify(
            {
                message: 'error to generate information',
            },
            null,
            2
            )
        }
    }
}

const cognitoSignup = ({email, password,nombre,apellido,telefono,edad,roles}) => {
    return new Promise ((resolve, reject) => {
        AwsConfig.getUserPool().signUp(email, password,nombre,apellido,telefono,edad,roles, AwsConfig.getCognitoAttributeList(), null, (err, result) => {
            if(err) reject(err);
            resolve(result)
        });
    })
}

module.exports.register2 = register2;