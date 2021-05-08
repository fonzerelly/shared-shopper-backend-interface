const {Given, When, Then} = require('@cucumber/cucumber')

const axios = require('axios')
const get = axios.get
const post = axios.post
const del = axios.delete

const { expect } = require('chai')

const descriptiveStep = () => {}

Given('der User hat sich erfolgreich eingeloggt', async () =>{
  const loginResponse = await post('http://localhost:3000/login',{
    email: 'hab@ich.net',
    password: 'll11OO!!'
  }, {
    headers: {
      'x-shared-shopper-secret': 'FAKE_SECRET'
    }
  })
  this.accessToken = await loginResponse.data.accessToken
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
      headers: {
        authorization: this.accessToken,
        'x-shared-shopper-secret': 'FAKE_SECRET'
      }
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
    headers: {
      authorization: this.accessToken,
      'x-shared-shopper-secret': 'FAKE_SECRET'
    }
  })
  const lists = await response.data.shoppingLists
  this.deletedId = lists[0].id
  expect(this.deletedId).not.to.be.undefined
  await del(`http://localhost:3000/overview/${this.deletedId}`, {
    headers: {
      'x-shared-shopper-secret': 'FAKE_SECRET',
      authorization: this.accessToken
    }
  })
});


Then('taucht der Titel des Einkaufszettel nicht mehr in der Übersicht aufgerufen', async () => {
  const response = await get('http://localhost:3000/overview', {
    headers: {
      authorization: this.accessToken,
      'x-shared-shopper-secret': 'FAKE_SECRET'
    }
  })
  const lists = await response.data.shoppingLists;
  const deletedId = this.deletedId
  expect(lists.find(list => list.id === deletedId)).to.be.undefined
});

