const { log } = require('../log/log')

const enforceContentTypeHeader = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const lowerCasedHeaders = Object.keys(req.headers).reduce((headers, key) => {
      headers[key.toLowerCase()] = req.headers[key]
      return headers
    }, {})
    if (
      Object.keys(lowerCasedHeaders).includes('content-type') &&
      lowerCasedHeaders['content-type'] === 'application/json'
    ) {
      return next()
    }
    log({error: `Es wurde kein Content-Type-Header: application/json mitgegeben.`})
    return res.sendStatus(400)
  }
  return next()
}

module.exports = {
  enforceContentTypeHeader
}