
const AwsConfig = require('../../helpers/AwsConfig');
const ForgotPassword =async (event) => {
    try {
        AwsConfig.initAWS ();
        let { confirmationCode, newPassword  } = JSON.parse(event.body);
        let user = await confirmPassword( {confirmationCode, newPassword} );
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


function confirmPassword(confirmationCode, newPassword, callback) {
    const jsonReq = {
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
      Username: email,
      ConfirmationCode: confirmationCode,
      Password: newPassword,
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.makeUnauthenticatedRequest('confirmForgotPassword', jsonReq, err => {
      if (err) {
        return callback.onFailure(err);
      }
      return callback.onSuccess();
    });
  };

module.exports.ForgotPassword = ForgotPassword;