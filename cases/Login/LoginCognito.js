const AwsConfig = require('../../helpers/AwsConfig');
const Login =async (event) => {
    try {
        AwsConfig.initAWS ();
        let { email, password } = JSON.parse(event.body);
        let user = await signIn( {email, password} );
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

function signIn({email, password}) {
    return new Promise((resolve) => {
      AwsConfig.getCognitoUser(email).authenticateUser(AwsConfig.getAuthDetails(email, password), {
        onSuccess: (result) => {
          const token = {
            accessToken: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          }
           resolve({ statusCode: 200, response: token });
        },

        onFailure: (err) => {
           resolve({ statusCode: 400, response: err.message || JSON.stringify(err)});
        },
      });
    });
  }

module.exports.Login = Login;
