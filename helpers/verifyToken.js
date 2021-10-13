import * as Axios from 'axios';
import * as jsonwebtoken from 'jsonwebtoken';
import { isObjEmpty } from './objectManager';
const jwkToPem = require('jwk-to-pem');

const cognitoPoolId = process.env.AWS_COGNITO_USER_POOL_ID ;
const region= cognitoPoolId.split('_')[0];
if (!cognitoPoolId) {
  throw new Error('env var required for cognito pool');
}
const cognitoIssuer = `https://cognito-idp.${region}.amazonaws.com/${cognitoPoolId}`;


let cacheKeys;
const getPublicKeys = async () => {
  if (!cacheKeys) {
    const url = `${cognitoIssuer}/.well-known/jwks.json`;
    const publicKeys = await Axios.default.get(url);
    cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
      const pem = jwkToPem(current);
      agg[current.kid] = {instance: current, pem};
      return agg;
    }, {});
    return cacheKeys;
  } else {
    return cacheKeys;
  }
};

//const verifyPromised = promisify(jsonwebtoken.verify.bind(jsonwebtoken));

function verifyPromised(token, pem){
  console.log(token)
  return new Promise(async(resolve, reject) => {
      try {
        const resp = await jsonwebtoken.verify(token, pem);
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
    console.log(token);
    const tokenSections = (token || '').split('.');
    if (tokenSections.length < 2) {
      throw new Error('requested token is invalid');
    }
    const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
    const header = JSON.parse(headerJSON);
    const keys = request.publicKey;
    const key = keys[header.kid];
    if (key === undefined) {
      throw new Error('claim made for unknown kid');
    }
    const claim = await verifyPromised(token, key.pem) ;
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

export {validateToken, getPublicKeys};