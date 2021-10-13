const { validateToken } = require("../../helpers/verifyToken");

//aqui debe ir la obtención de las llaves publicas
let publicKey = null;

exports.TOKE =  function(event,req, context, callback) {
    console.log("SI ENTRO PS PRRO :V ye si ")
    console.log(event.methodArn);

    if (!publicKey) {
        console.log("entro en el obtener publi keys")
        publicKey = await getPublicKeys();
    }


    const token = await validateToken({ token: event.authorizationToken.split(" ")[1], publicKey })
    console.log("tuuu")
    if (!token.isValid) return { err: "Token no valido" }
    console.log("Estoy aqui", event.methodArn)
    let role = token.roles[0];
        switch (role) {
            case 'ADMIN':
                callback(null, generatePolicy('user', "Allow", event.methodArn));
                break;
            case 'Cliente':
                callback(null, generatePolicy('user', "Allow", event.methodArn));
                break;
            default:
                return {
                    statusCode: 401,
                    body: JSON.stringify({
                        message: {
                            err: 'Usuario no authenticado'
                        }
                    })
                }
        }

};
  // Help function to generate an IAM policy
  var generatePolicy = function(principalId, effect, resource) {
    var authResponse = {};

    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = '2012-10-17';
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke';
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }

    // Optional output with custom properties of the String, Number or Boolean type.
    authResponse.context = {
        "stringKey": "stringval",
        "numberKey": 123,
        "booleanKey": true
    };
    return authResponse;
  }



