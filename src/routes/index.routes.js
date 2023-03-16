const { Router } = require("express");
const route = Router();
const Recaptcha = require("express-recaptcha").RecaptchaV3;

// const recaptcha = new Recaptcha(
//   process.env.SITE_KEY,
//   process.env.SECRET_KEY_RECAPTCHA,
//   { callback: "cb" }
// );
const { check, validationResult } = require("express-validator");
const { Send } = require("../helpers/sendEmail");

const Val = [
  check("email").isEmail(),
  check("name").isLength({ min: 10 }),
  check("msg").isLength({ min: 10 })
];

route.get("/start", (req, res) => {
  res.locals.metaTags = { 
    title: "Desarrollo Web Jr", 
    description: "Sitio Web Personal www.chrisweb.me",   
    keywords: "Jesus Christian Castillo Desarrollo web UPVM " 
}; 
  res.render("index", { layout: "main" });
});

route.get("/projects", (req, res) => {
  res.render("templates/projects");
});

// route.get("/aboutMe", recaptcha.middleware.render, (req, res) => {
//   res.render("templates/profile");
// });

route.get("/aboutMe",  (req, res) => {
  res.render("templates/profile");
});

// route.post("/aboutMe", recaptcha.middleware.verify, Val, (req, res) => {
//   if (!req.recaptcha.error) {
//     try {
//       validationResult(req).throw();
//       const { name, email, msg } = req.body;
//       Send(name, email, msg);
//       res.render("templates/profile", {
//         success_msg: "Email enviado correctamente, Gracias."
//       });
//     } catch (err) {
//       console.log(err.array());
//       const e = err.array();
//       res.render("templates/profile", {
//         e
//       });
//     }
//   } else {
//     res.render("templates/profile", {
//       error_msg: "Por favor, seleccione la casilla NO SOY ROBOT"
//     });
//   }
// });

route.get("/cv", (req, res) => {
  res.render("templates/cv");
});

module.exports = route;
