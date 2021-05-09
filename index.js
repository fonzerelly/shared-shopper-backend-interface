const express = require('express')
const cors = require('cors')
const app = express()

const log = (data) => {
  const str = Object.keys(data).reduce((s, key) => {
    return s += ` ${key}: ${data[key]}`
  }, '')
  const d = new Date()
  
  console.log(`${d.toISOString()}${str}`)
}

app.use(cors())

app.use(express.json({limit: '20mb'}))

app.use((req, res, next) => {
  if (!req.headers['x-shared-shopper-secret']) {
    log({error: 'Es wurde kein x-shared-shopper-secret angegeben'})
    return res.status(403).send({msg: 'error'})
  }
  return next()
})

app.use((req, _, next) => {
  log({method: req.method, url: req.url, body: JSON.stringify(req.body)})
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
let db
app.post('/login', (req, res) => {
  accessToken = String(Math.ceil(Math.random()*10000000))
  db = {
    shoppingLists: [
      {
        id: 0,
        name: 'Weihnachtsessen',
        content: [
          {
            id: 1000,
            label: 'Klosteig',
            count: 3,
            position: 0
          },
          {
            id: 1001,
            label: 'Gans',
            count: 1,
            position: 1
          }
        ]
      },
      {
        id: 1,
        name: 'Sylvesterparty',
        content: [
          {
            id: 2000,
            label: 'Brötchen',
            count: 15,
            position: 0
          },
          {
            id: 2001,
            label: 'Salamie',
            count: 2,
            position: 1
          },
          {
            id: 2002,
            label: 'Reibekäse',
            count: 2,
            position: 2
          },
        ]
      }
    ]
  }
  log({message: `User ${req.body.email} ist eingeloggt und verwendet den accessToken ${accessToken}.`})
  log({message: `Datenbank mit ${db.shoppingLists.length} Einträgen wurde geladen.`})
  res.send({
    accessToken
  })
})

const router = express.Router()
router.use((req, res, next) => {
  if (req.headers.authorization === accessToken) {
    return next()
  }
  log({error: 'Es wurde kein authorization header angegeben.'})
  return res.sendStatus(401)
})

router.get('/overview', (req, res) => {
  res.send(db)
})

router.delete('/overview/:listId', (req, res) => {
  const idToDelete = parseInt(req.params.listId, 10)
  db.shoppingLists = db.shoppingLists.filter((list) => {
    return list.id !== idToDelete
  })
  res.sendStatus(200)
})

router.post('/overview/add', (req, res) => {
  const newId = Math.ceil(Math.random() * 100)
  const newList = {
    id: newId,
    name: req.body.name,
    content: []
  }

  db.shoppingLists.push(newList)
  log({message: `Es wurde ein neuer Einkaufszettel mit der id ${newId} angelegt.`})
  res.send(newList)
})

router.get('/shoppinglist/:shoppingListId', (req, res) => {
  const id = parseInt(req.params.shoppingListId, 10)
  const shoppingList = db.shoppingLists.find((list) => {
    return list.id === id
  })
  res.send(shoppingList.content)
})


const findShoppingList = (id) => db.shoppingLists.find((list) => list.id === id)

router.post('/shoppinglist/:shoppingListId/add', (req, res) => {
  const id = parseInt(req.params.shoppingListId, 10)
  const shoppingList = findShoppingList(id)
  const newEntry = {
    ... req.body,
    id : Math.ceil(Math.random()*1000),
    position: shoppingList.content.length
  }
  shoppingList.content.push(newEntry)
  log({message: `Es wurde ein neuer Einkaufszetteleintrag mit der id ${newEntry.id} angelegt.`})
  res.send(newEntry)
})

router.delete('/shoppinglist/:shoppingListId/:entryId', (req, res) => {
  const shoppingListId = parseInt(req.params.shoppingListId, 10)
  const entryId = parseInt(req.params.entryId, 10)
  const shoppingList = findShoppingList(shoppingListId)

  shoppingList.content = shoppingList.content.filter((entry) => entry.id !== entryId)
  log({message: `Der Eintrag mit der id ${entryId} wurde gelöscht.`})
  res.sendStatus(200)
})

const findEntry = (list, id) => list.find((entry) => entry.id === id)
const findPosition = (list, pos) => list.find((entry) => entry.position === pos)
router.put('/shoppinglist/:shoppingListId/:entryId/moveUp', (req, res) => {
  const shoppingListId = parseInt(req.params.shoppingListId, 10)
  const entryId = parseInt(req.params.entryId, 10)
  const shoppingList = findShoppingList(shoppingListId)

  const lowerEntry = findEntry(shoppingList.content, entryId)
  const upperEntry = findPosition(shoppingList.content, lowerEntry.position - 1)
  lowerEntry.position -= 1
  upperEntry.position += 1

  res.sendStatus(200)
})

app.use('/', router)
 
app.listen(3000)