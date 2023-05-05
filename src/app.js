const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const helmet = require('helmet')

const http = require('http').createServer(app)
const logger = require('winston')

app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// security
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      'default-src': ["'none'"],
      'script-src': ["'self'", 'https://code.jquery.com/jquery-3.6.0.min.js', 'https://www.googletagmanager.com/gtag/js?id=UA-150948906-1'],
      'font-src': ["'self'", 'http://fonts.gstatic.com'],
      'connect-src': ["'self'"],
      'img-src': ["'self'", 'https://img.icons8.com'],
      'style-src': ["'self'", 'https://fonts.googleapis.com'],
      'media-src': null
    }
  }
}
))

app.disable('x-powered-by')

// settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')
// app.enable('view cache')

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
