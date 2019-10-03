const nodemailer = require("nodemailer");
const Vl={};

Vl.Send = async (name, email, msg)=>{
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  });

  const mailOptions = {
    to: "	dev.chrisweb@gmail.com",
    from: email,
    subject: 'Comentarios del Portal ChrisWeb',
    text: `Tienes un nuevo comentario `,
    html: `<center><img src="https://img.icons8.com/nolan/128/000000/robot-2.png"></center>
              <h2 style="text-align: center;">Tienes un nuevo mensaje de ${ name }</h2> <br>
              <h2 style="text-align: center;">Correo electronico ${ email }</h2> <br>
              <h3 style="text-align: center;"> ${ msg } </h3><br>
              <hr style="color: #0056b2;" />
              <br>
             <p style="text-align: center;">© 2019 Copyright: chrisweb.me </p> `
  };

  const sm = await transporter.sendMail(mailOptions);
  console.log('Mensaje enviado', sm);
  return sm;

}




module.exports= Vl;

