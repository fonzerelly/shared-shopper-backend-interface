const { log } = require('../log/log')

const authenticationGuard = (db) => {
  return (req, res, next) => {
    if (req.headers.authorization === db.accessToken) {
      return next()
    }
    log({error: 'Es wurde kein authorization header angegeben.'})
    return res.sendStatus(401)
  }
}

module.exports = {
  authenticationGuard
}