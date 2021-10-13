
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const AwsConfig = require('../../helpers/AwsConfig');
const ChangePasswor =async (event) => {
    try {
        AwsConfig.initAWS ();
        let { email, password,newpassword } = JSON.parse(event.body);
        let user = await ChangePassword( {email, password,newpassword} );
        console.log(user)
        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                    message: 'Login done',
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


module.exports.ChangePasswor = ChangePasswor;