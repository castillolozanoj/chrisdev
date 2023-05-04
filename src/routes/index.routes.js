const { Router } = require('express')
const logger = require('../config/logger')
const route = Router()
const Recaptcha = require('express-recaptcha').RecaptchaV3
const { validationResult } = require('express-validator')

const recaptcha = new Recaptcha(
  process.env.SITE_KEY,
  process.env.SECRET_KEY_RECAPTCHA,
  { callback: 'cb' }
)

const { Send } = require('../helpers/sendEmail')
const { experience, school } = require('./data/dataExperience')
const projects = require('./data/dataProjects')
const metaTags = require('./data/dataMetaTags')
const validateInputs = require('./data/validateInputs')

route.get('/', async (req, res) => {
  try {
    await res.render('index', {
      layouts: 'main',
      metaTags
    })
  } catch (error) {
    logger.error(error)
  }
})

route.get('/projects', async (req, res) => {
  try {
    await res.render('templates/projects', { metaTags, projects })
  } catch (error) {
    logger.error(error)
  }
})

route.get('/about-me', async (req, res) => {
  try {
    await res.render('templates/profile', { metaTags })
  } catch (error) {
    logger.error(error)
  }
})

route.post('/about-me', recaptcha.middleware.verify, validateInputs, async (req, res) => {
  if (req.recaptcha.error) {
    await res.render('templates/profile', {
      metaTags,
      error_msg: 'Por favor, seleccione la casilla NO SOY ROBOT'
    })
    return
  }
  try {
    validationResult(req).throw()
    const { name, email, msg } = req.body
    await Send(name, email, msg)
    res.render('templates/profile', {
      metaTags,
      success_msg: 'Email enviado correctamente, ¡gracias!'
    })
  } catch (err) {
    logger.error(err.array())
    const errors = err.array()
    res.render('templates/profile', { metaTags, errors })
  }
})

route.get('/cv', async (req, res) => {
  try {
    await res.render('templates/cv', { metaTags, experience, school })
  } catch (error) {
    logger.error(error)
  }
})

module.exports = route
