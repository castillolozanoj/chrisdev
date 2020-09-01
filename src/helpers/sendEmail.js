const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const Vl = {};


Vl.Send = async (name, email, msg) => {
  const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: process.env.SENDGRID_KEY,
      },
    })
  );

  const mailOptions = {
    to: "christian.castillo.lozano@gmail.com",
    from: "jesuschris.castillo@gmail.com",
    subject: "Comentarios del Portal ChrisWeb",
    html: `<center><img src="https://img.icons8.com/nolan/128/000000/robot-2.png"></center>
    <h2 style="text-align: center;">Tienes un nuevo mensaje de ${name}</h2> <br>
    <h2 style="text-align: center;">Correo electrónico ${email}</h2> <br>
    <h3 style="text-align: center;"> ${msg} </h3><br>
    <hr style="color: #0056b2;" />
    <br>
   <p style="text-align: center;">© 2020 Copyright: www.chrisweb.digital </p> `
  };

  const sm = await transporter.sendMail(mailOptions);
  console.log("Mensaje enviado", sm);
  return sm;
};

module.exports = Vl;
