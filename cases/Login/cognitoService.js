const AwsConfig = require('../../helpers/AwsConfig');
const register =async (event) => {
    try {
        AwsConfig.initAWS ();
        let { email, password } = JSON.parse(event.body);
        AwsConfig.setCognitoAttributeList(email,'');

        let user = await cognitoSignup( {email, password} );
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

const cognitoSignup = ({email, password}) => {
    return new Promise ((resolve, reject) => {
        AwsConfig.getUserPool().signUp(email, password, AwsConfig.getCognitoAttributeList(), null, (err, result) => {
            if(err) reject(err);
            resolve(result)
        });
    })
}

module.exports.register = register