  import { validateToken, getPublicKeys } from '../../helpers/verifyToken';
  import { PolicyIamManager } from './policyIamManager';

  //aqui debe ir la obtención de las llaves publicas
  // let publicKey = null;


      async function  authorizer(event, context, callback){
        console.log("holaaaa :V ");
      // console.log("hola mundo que tal a todos")
      // console.log(event.methodArn);


      // if (!publicKey) {
      //     console.log("entro en el obtener publi keys")
      //     publicKey = await getPublicKeys();
      // }

      const policyIamManager = new PolicyIamManager();

      // // const token = await  authorizerMagager.getToken(event.authorizationToken.split(" ")[1]);
      // const token = await validateToken({ token: event.authorizationToken.split(" ")[1], publicKey })
      // console.log("hola que talr")
      // if (!token.isValid) return { err: "Token no valido" }
      // console.log("Estoy aqui", event.methodArn)
      callback(null, policyIamManager.getPolicy('user', "Allow", event.methodArn));


  };

  module.exports.authorizer = authorizer ;