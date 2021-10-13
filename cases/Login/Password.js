const AwsConfig = require('../../helpers/AwsConfig');
const {getUserContextData} = require('../../helpers/AwsConfig')
const Password =async (event) => {
    try {
        AwsConfig.initAWS ();
        let { email } = JSON.parse(event.body);
        let user = await forgotPassword( {email} );
        console.log(user)
        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                    message: 'Cheque su Corrreo Electronio',
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

function forgotPassword(callback) {
    const jsonReq = {
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
      Username: this.email,
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = getUserContextData();
    }
    this.client.makeUnauthenticatedRequest('forgotPassword', jsonReq, (err, data) => {
      if (err) {
        return callback.onFailure(err);
      }
      if (typeof callback.inputVerificationCode === 'function') {
        return callback.inputVerificationCode(data);
      }
      return callback.onSuccess(data);
    });
  }



module.exports.Password = Password;