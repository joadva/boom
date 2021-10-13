var nodemailer = require ("nodemailer");

const PresTab = "alexane.cremin51@ethereal.email";

const sendMail = async (email, message) => {
    try{
        let correo = nodemailer.createTransport({
            // host: "smtp.gmail.com",
            host: 'smtp.ethereal.email',
            port: 587,
            secure: STARTTLS,
            auth: {
              user: PresTab,
              pass: "UEa4v1yuZcPKFyzGdu",
            },
          });

          var mailOptions = {
              from:PresTab,
              to:email,
              subject: "Prestab ",
              text: message
          }
          let send = await correo.sendMail(mailOptions);
          console.log(send);
          return true;
    }catch(e){
        console.log(e)
        return {
            statusCode: 500,
            body: JSON.stringify({error: e.stack})
        }
    }
}



module.exports.sendMail = sendMail;