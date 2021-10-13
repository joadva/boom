const AWS = require('aws-sdk');
const jwt_decode = require('jwt-decode');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
let cognitoAttributeList = [];

const poolData = {
    UserPoolId : "us-east-1_hrTIOroN5",
    ClientId : "6987bb6f8gsqia2sfc3eqj8abl"
};


const attributes = (key, value) => {
  return {
    Name : key,
    Value : value
  }
};

function setCognitoAttributeList(email, agent) {
  let attributeList = [];
  attributeList.push(attributes('email',email));
  attributeList.forEach(element => {
    cognitoAttributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(element));
  });
}

function getCognitoAttributeList() {
  return cognitoAttributeList;
}

function getCognitoUser(email) {
  const userData = {
    Username: email,
    Pool: getUserPool()
  };
  return new AmazonCognitoIdentity.CognitoUser(userData);
}

function getUserPool(){
  console.log(poolData)
  return new AmazonCognitoIdentity.CognitoUserPool(poolData);
}

function getAuthDetails(email, password) {
  var authenticationData = {
    Username: email,
    Password: password,
   };
  return new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
}

function initAWS (region = process.env.AWS_COGNITO_REGION) {
  AWS.config.region = region; // Region
  // AWS.config.credentials = new AWS.CognitoIdentityCredentials();
}

function decodeJWTToken(token) {
  const {  email, exp, auth_time , token_use, sub} = jwt_decode(token.idToken);
  return {  token, email, exp, uid: sub, auth_time, token_use };
}

function getUserContextData() {
  const pool = getUserPool();
  return pool.getUserContextData(email);
}

module.exports = {
  initAWS,
  getCognitoAttributeList,
  getUserPool,
  getCognitoUser,
  setCognitoAttributeList,
  getAuthDetails,
  decodeJWTToken,
  getUserContextData
}