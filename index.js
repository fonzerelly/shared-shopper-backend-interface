const express = require('express')
const app = express()
app.use(express.json({limit: '20mb'}))

app.get('/health', function (req, res) {
  res.send({
    uptime: 3.1415,
    dbConnection: true
  })
})

app.post('/register', function (req, res) {
  console.log(req.body, !req.body.email, !req.body.password)
  if (!req.body.email || !req.body.password) {
    return res.sendStatus(500)
  }
  res.sendStatus(200)
})
 
app.listen(3000)