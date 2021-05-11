const { log } = require('../log/log')

const secretGuard = (req, res, next) => {
  if (!req.headers['x-shared-shopper-secret']) {
    log({error: 'Es wurde kein x-shared-shopper-secret angegeben'})
    return res.status(403).send({msg: 'error'})
  }
  return next()
}

module.exports = {
  secretGuard
}