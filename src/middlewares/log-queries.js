const { log } = require('../log/log')

const logQueries = (req, _, next) => {
  log({method: req.method, url: req.url, body: JSON.stringify(req.body)})
  next()
}

module.exports = {
  logQueries
}