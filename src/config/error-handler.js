module.exports = (err) => {
  console.error('Exiting process due to error:', err.message)
  process.exit(1)
}
