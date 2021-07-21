const express = require("express");
const app = new express();
const path = require("path");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const helmet = require("helmet");
const http = require("http").createServer(app);
const express_enforces_ssl = require("express-enforces-ssl");
const hostValidation = require("host-validation");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//settings
app.set("port", process.env.PORT);
app.set("views", path.join(__dirname, "views"));
app.engine(
  "handlebars",
  exphbs({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//middleware
app.enable("trust proxy");
app.use(express_enforces_ssl());
app.use(
  helmet({
      contentSecurityPolicy: {
          directives: {
           defaultSrc:["'self'"],
				   scriptSrc:["'self'",'code.jquery.com','maxcdn.bootstrapcdn.com','https://www.gstatic.com/recaptcha/', 'googletagmanager.com','https://www.google.com/recaptcha/'],
				   styleSrc:["'self'",'maxcdn.bootstrapcdn.com'],
				   fontSrc:["'self'",'maxcdn.bootstrapcdn.com'],
           imgSrc:["'self'", 'img.icons8.com', 'ih1.redbubble.net'],
           frameSrc: ["'self'", "https://www.google.com", 'https://recaptcha.google.com/recaptcha/','https://www.google.com/recaptcha/']
          }
      },
  })
);
app.use(morgan("dev"));
app.use(favicon(path.join(__dirname, "public/img", "favicon.ico")));
app.use(
  hostValidation({
    hosts: [
      "127.0.0.1:8080",
      `localhost:${app.get("port")}`,
      "chrisweb.digital",
      "www.chrisweb.digital",
      /.*\.chrisweb\.digital$/
    ]
  })
);

//routes
app.use(require("./routes/index.routes"));

//statics files
app.use(express.static(path.join(__dirname, "public")));

//404
app.use((req, res, next) => {
  res.status(400).sendFile(path.join(__dirname, "public", "404.html"));
});

// Unhandled errors (500)
app.use(function(err, req, res, next) {
  console.error("An application error has occurred:");
  console.error(err);
  console.error(err.stack);
  res.status(500).sendFile(path.join(__dirname, "public", "500.html"));
});

// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR,
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Aun estoy vivo!");

module.exports = { app, http };
