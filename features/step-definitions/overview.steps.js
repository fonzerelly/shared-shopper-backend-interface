const {Given, When, Then, Before} = require('@cucumber/cucumber')

const axios = require('axios')
const get = axios.get
const post = axios.post
const del = axios.delete

const { expect } = require('chai')

const { login, createShoppingList } = require('../helpers/shoppinglist')
const { readOverview, deleteShoppinglist } = require('../helpers/overview')

const descriptiveStep = () => {}

const createHeaders = (accessToken) => ({
  authorization: accessToken,
  'x-shared-shopper-secret': 'FAKE_SECRET',
  'Content-Type': 'application/json'
})

let scenarioLabel
Before((scenario) => {
  scenarioLabel = scenario.pickle.name
  this[scenarioLabel] = {}
})

const extendThis = (newData) => {
  this[scenarioLabel] = {
    ...this[scenarioLabel],
    ...newData
  }
}

Given('der User hat sich eingeloggt um mit der Übersicht zu arbeiten', async () =>{
  extendThis(await login())
});


Given('der User hat bereits einige Einkaufszettel in der Vergangenheit angelegt', descriptiveStep)


Given('der User verwendet einen ungültigen accessToken', async () => {
  const { accessToken } = this[scenarioLabel]
  extendThis({
    accessToken: accessToken
      .split('')
      .reverse()
      .join('')
  })
});


When('der User die Liste aller seiner Einkaufszetten einsehen will', async () => {
  const { accessToken } = this[scenarioLabel]
  extendThis(await readOverview(accessToken))
});

Then('schlägt der overview-Aufruf fehl', async () => {
  expect(this[scenarioLabel].status).to.equal(401)
})

Then('sieht er die Titel aller seiner Einkaufszettel', async () => {
  const { status, overview } = this[scenarioLabel]
  expect(status).to.equal(200)
  expect(overview.length).to.greaterThan(0)
  overview.forEach((shoppinglist) => {
    const shoppinglistKeys = Object.keys(shoppinglist).sort()
    expect(shoppinglistKeys).to.eql(['id', 'name'])
  })

});

When('der User einen Einkaufszettel löscht', async () => {
  const { accessToken } = this [scenarioLabel]
  const { overview } = await readOverview(accessToken)
  const deletedId = overview[0].id
  expect(deletedId).not.to.be.undefined
  extendThis({deletedId})
  
  extendThis(await deleteShoppinglist(accessToken, deletedId))
});


Then('taucht der Titel des Einkaufszettel nicht mehr in der Übersicht aufgerufen', async () => {
  const { accessToken } = this[scenarioLabel]
  const { overview } = await readOverview(accessToken)
  const deletedId = this.deletedId
  expect(overview.find(list => list.id === deletedId)).to.be.undefined
});

When('der User einen neuen Einkaufszettel anlegt', async () => {
  const { accessToken } = this[scenarioLabel]
  extendThis(await createShoppingList(accessToken))
});

Then('taucht der Titel des Einkaufszettel in der Übersicht der Einkaufszettel auf', async () => {
  const { accessToken, newShoppinglist } = this[scenarioLabel]
  const { overview } = await readOverview(accessToken)
  const lastNewId = newShoppinglist.id
  expect(overview.find((list) => list.id === lastNewId)).not.to.be.undefined
});
