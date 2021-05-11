const {Given, When, Then, Before} = require('@cucumber/cucumber')

const axios = require('axios')
const get = axios.get
const post = axios.post
const del = axios.delete

const { expect } = require('chai')

const { login, createShoppingList } = require('../helpers/shoppinglist')

const descriptiveStep = () => {}

const createHeaders = (accessToken) => ({
  authorization: accessToken,
  'x-shared-shopper-secret': 'FAKE_SECRET',
  'Content-Type': 'application/json'
})

let scenarioLabel
Before((scenario) => {
  scenarioLabel = scenario.pickle.name
})

Given('der User hat sich eingeloggt um mit der Übersicht zu arbeiten', async () =>{
  await login(this)
});


Given('der User hat bereits einige Einkaufszettel in der Vergangenheit angelegt', descriptiveStep)


Given('der User verwendet einen ungültigen accessToken', async () => {
  this.accessToken =
    this.accessToken
      .split('')
      .reverse()
      .join('')
});


When('der User die Liste aller seiner Einkaufszetten einsehen will', async () => {
  try {
    const response = await get('http://localhost:3000/overview', {
      headers: createHeaders(this.accessToken)
    })
    this.lastStatus = await response.status
    this.result = await response.data
  } catch (error) {
    this.lastStatus = error.response.status
  }
});

Then('schlägt der overview-Aufruf fehl', async () => {
  expect(this.lastStatus).to.equal(401)
})

Then('sieht er die Titel aller seiner Einkaufszettel', async () => {
  expect(this.lastStatus).to.equal(200)
  expect(this.result.shoppingLists.length).to.greaterThan(0)
});

When('der User einen Einkaufszettel löscht', async () => {
  const response = await get('http://localhost:3000/overview', {
    headers: createHeaders(this.accessToken)
  })
  const lists = await response.data.shoppingLists
  this.deletedId = lists[0].id
  expect(this.deletedId).not.to.be.undefined
  await del(`http://localhost:3000/overview/${this.deletedId}`, {
    headers: createHeaders(this.accessToken)
  })
});


Then('taucht der Titel des Einkaufszettel nicht mehr in der Übersicht aufgerufen', async () => {
  const response = await get('http://localhost:3000/overview', {
    headers: createHeaders(this.accessToken)
  })
  const lists = await response.data.shoppingLists;
  const deletedId = this.deletedId
  expect(lists.find(list => list.id === deletedId)).to.be.undefined
});

When('der User einen neuen Einkaufszettel anlegt', async () => {
  await createShoppingList(this)
});

Then('taucht der Titel des Einkaufszettel in der Übersicht der Einkaufszettel auf', async () => {
  const response = await get('http://localhost:3000/overview', {
    headers: createHeaders(this.accessToken)
  })
  const lists = await response.data.shoppingLists
  const lastNewId = this.lastNewShoppingList.id
  expect(lists.find((list) => list.id === lastNewId)).not.to.be.undefined
});
