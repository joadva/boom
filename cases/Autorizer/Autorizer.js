const Axios = require('axios').default;
const { isObjEmpty }= require('../../helpers/objectManager');
var jwkToPem = require('jwk-to-pem'),jwt = require('jsonwebtoken');

//aqui debe ir la obtención de las llaves publicas
let publicKey = null;
const TOKE = async (event, context, callback)  => {

    console.log("SI ENTRO PS :V oye si ")
    console.log(event.methodArn);

    if (!publicKey) {
        console.log("entro en el obtener publi keys")
        publicKey = await getPublicKeys();
    }

    // Entra el token
    // const token = event.authorizationToken ;
    // obtiene el token nwn

const token = await validateToken({token: event.authorizationToken.split(" ")[1],publicKey})
/* console.log(event.authorizationToken.split(" ")); */
console.log( "const token :V ", token);
if (!token.isValid) return {err: "Token no valido :V"}

console.log('aqui', event.methodArn);


//validad para el acceso sea el rol que va a descomprimir el token o no :V
let roles = token.roles[0];
console.log("mira los roles", roles)

    switch (roles) {
        case 'Admin':
            callback(null, getPolicy('user', 'Allow', event.methodArn)); // es autorizado
            break;
        case 'Cobrador':
            callback(null, getPolicy('user', 'Allow', event.methodArn));// es autorizado
            break;
        case 'Cliente':
            callback(null, getPolicy('user', 'Allow', event.methodArn)); // es autorizado
            break;
        case 'unauthorized':
            callback("Unauthorized");   // Return a 401 Unauthorized response
            break;
        default:
            callback("Error: Invalid token"); // Return a 500 Invalid token response
    }
  };

  // Help function to generate an IAM policy
  var getPolicy = function(principalId, effect, resource) {
    const authResponse = {};

    authResponse.principalId = principalId;
if (effect && resource) {
    const  policyDocument= {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
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


/// verify y validate token

const cognitoPoolId = process.env.COGNITO_POOL_ID || '';
const region= cognitoPoolId.split('_')[0];
if (!cognitoPoolId) {
  throw new Error('env var required for cognito pool');
}
const cognitoIssuer = `https://cognito-idp.${region}.amazonaws.com/${cognitoPoolId}`;


let cacheKeys;
const getPublicKeys = async () => {
    // console.log('velo :V:',getPublicKeys);
  if (!cacheKeys) {
    const url = `${cognitoIssuer}/.well-known/jwks.json`;
    const publicKeys = await Axios.get(url);
    cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
      const pem = jwkToPem(current);
      agg[current.kid] = {instance: current, pem};
    //   console.log('el gg',agg);
      return agg;
    }, {} );
    return cacheKeys;
  } else {
    return cacheKeys;
  }
};

//const verifyPromised = promisify(jsonwebtoken.verify.bind(jsonwebtoken));

function verifyPromised(token, pem){
    //  console.log('otro token :V ',token)
  return new Promise(async(resolve, reject) => {
      try {
        const resp = await jsonwebtoken.verify(token, pem);
        // console.log('aqui :V ', token,pem);
        resolve(resp)
      } catch (error) {
        reject({})
      }

  })
}

const validateToken = async (request) => {
  let result;
  try {
    const token = request.token;
    // console.log('vessss',token)
    const tokenSections = (token || '').split('.');
    // console.log('sandungue :V ',tokenSections)
    if (tokenSections.length < 2) {

      throw new Error('requested token is invalid');
    }
    const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
    const header = JSON.parse(headerJSON);
    const keys = request.publicKey;
    // console.log('hola :v' ,keys)
    const key = keys[header.kid];
    // console.log('nose pero aqui vee', header.kid)
    if (key === undefined) {
      throw new Error('claim made for unknown kid');
    }
console.log('gatitos');


    const claim = await verifyPromised(token, key.pem);
    console.log(token,key.pem);
    if(isObjEmpty(claim))throw new Error('claim is expired or invalid');
    const currentSeconds = Math.floor( (new Date()).valueOf() / 1000);
    if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
        throw new Error('claim is expired or invalid');

    }
    if (claim.iss !== cognitoIssuer) {

      throw new Error('claim issuer is invalid');
    }
    if (claim.token_use !== 'access' && claim.token_use !== "id") {
      throw new Error('claim use is not access');
    }
    result = {roles: claim['cognito:groups'], isValid: true};

  } catch (error) {
    result = {error: error.message, email: "", isValid: false};
  }
  return result;
};

  module.exports.TOKE = TOKE ;

