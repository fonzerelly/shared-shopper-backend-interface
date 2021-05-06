const express = require('express')
const app = express()
 
app.get('/health', function (req, res) {
  res.send({
    uptime: 3.1415,
    dbConnection: true
  })
})
 
app.listen(3000)