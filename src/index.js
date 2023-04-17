require('dotenv').config()
const { app, http } = require('./app.js')
const logger = require('winston')

// main.js
const handleError = require('./config/error-handler.js')

async function Main () {
  const port = app.get('port')
  try {
    if (!port) throw new Error('The application configuration does not specify a port number.')
    await http.listen(port)
    logger.info(`Server running on http://localhost:${port}`)
  } catch (err) {
    handleError(err)
  }
}

Main()
