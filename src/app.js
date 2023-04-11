const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const helmet = require('helmet')
const http = require('http').createServer(app)
const express_enforces_ssl = require('express-enforces-ssl')
const hostValidation = require('host-validation')
const compression = require('compression')
const logger = require('winston')

let config = require('./config/custom-environment-variables.json')[process.env.NODE_ENV] 

console.log('======>', config)

if (process.env.NODE_ENV === 'production') {
  logger.info('MODE PRODUCTION')

  app.set('trust proxy', 1)
  app.use(helmet())
  app.use(compression())
  app.use(express.static('public', { maxAge: 86400000 }))
  app.use(express_enforces_ssl())
  // Redirigimos todas las solicitudes HTTP a HTTPS
  app.use((req, res, next) => {
    if (req.protocol !== 'https') {
      res.redirect(`https://${req.hostname}${req.url}`)
    } else {
      next()
    }
  })

  app.use(
    hostValidation({
      hosts: [
      `localhost:${app.get('port')}`,
      'jesuschristiancastillolozano.com',
      'www.jesuschristiancastillolozano.com',
      /.*\.jesuschristiancastillolozano\.com$/
      ]
    })
  )
} else {
  logger.info('MODE DEVELOPER')
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(morgan('dev'))
}

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// settings
app.set('port', process.env.PORT)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')
app.enable('view cache')

// config Dir express-handlebars
app.engine(
  'handlebars',
  exphbs({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main'
  })
)

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')))

// routes
app.use(require('./routes/index.routes'))

// 404
app.use((req, res, next) => {
  res.status(400).sendFile(path.join(__dirname, 'public', '404.html'))
})

// Unhandled errors (500)
app.use(function (err, req, res, next) {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
  res.status(500).sendFile(path.join(__dirname, 'public', '500.html'))
})

module.exports = { app, http }

// app.use(
//   hostValidation({
//     hosts: [
//       '127.0.0.1:8080',
//       `localhost:${app.get('port')}`,
//       'chrisweb.tech',
//       'www.chrisweb.tech',
//       /.*\.chrisweb\.tech$/
//     ]
//   })
// )

// middleware
// app.enable('trust proxy')
// app.use(express_enforces_ssl())
// app.use(
//   helmet({
//       contentSecurityPolicy: {
//           directives: {
//            defaultSrc:[''self''],
// 				   scriptSrc:[''self'','code.jquery.com','maxcdn.bootstrapcdn.com','https://www.gstatic.com/recaptcha/', 'googletagmanager.com','https://www.google.com/recaptcha/','https://recaptcha.google.com/recaptcha/'],
// 				   styleSrc: [''self'', ''unsafe-inline''],
// 				   fontSrc:[''self'','maxcdn.bootstrapcdn.com'],
//            imgSrc:[''self'', 'img.icons8.com'],
//            frameSrc: [''self'', 'https://www.google.com', 'https://recaptcha.google.com/recaptcha/','https://www.google.com/recaptcha/'],
//            objectSrc: [''none''],
//            mediaSrc: [''self''],
//           }
//       },
//   })
// )
