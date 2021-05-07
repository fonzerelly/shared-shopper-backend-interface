const express = require('express')
const app = express()

const log = (data) => {
  const str = Object.keys(data).reduce((s, key) => {
    return s += ` ${key}: ${data[key]}`
  }, '')
  const d = new Date()
  
  console.log(`${d.toISOString()}${str}`)
}

app.use((req, res, next) => {
  if (!req.headers['x-shared-shopper-secret']) {
    log({error: 'Es wurde kein x-shared-shopper-secret angegeben'})
    return res.status(403).send({msg: 'error'})// fucksendStatus(403)
  }
  return next()
})

app.use(express.json({limit: '20mb'}))

app.use((req, _, next) => {
  log({url: req.url, body: JSON.stringify(req.body)})
  next()
})

app.get('/health', function (req, res) {
  res.send({
    uptime: 3.1415,
    dbConnection: true
  })
})

app.post('/register', (req, res) => {
  if (!req.body.email || !req.body.password) {
    log({
      error: `Der Payload erfüllt nicht das interface!`
    })
    return res.sendStatus(500)
  }
  log({
    message: `An ${req.body.email} wäre nun eine Mail mit einem Link der Form /validate/${Math.floor(Math.random()*10000000)} versendet worden.`
  })
  res.sendStatus(200)
})

app.get('/validate/:validateToken', (req, res) => {
  log({message: `Die Registrierung, die sich hinter ${req.params.validateToken} verbirgt wurde freigeschalten`})
  res.sendStatus(200)
})

let accessToken
app.post('/login', (req, res) => {
  accessToken = String(Math.ceil(Math.random()*10000000))
  log({message: `User ${req.body.email} ist eingeloggt und verwendet den accessToken ${accessToken}.`})
  res.send({
    accessToken
  })
})

const router = express.Router()
router.use((req, res, next) => {
  if (req.headers.authorization === accessToken) {
    return next()
  }
  res.sendStatus(401)
})

const db = {
  'Weihnachtsessen': {},
  'Sylvesterparty': {}
}
router.get('/overview', (req, res) => {
  res.sendStatus(200)
})

app.use('/', router)
 
app.listen(3000)