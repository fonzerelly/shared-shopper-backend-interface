const {Given, When, Then} = require('@cucumber/cucumber')

const {post, get} = require('axios')
const { expect } = require('chai')

const initOverviewData = (self) => {
  if (!self.overviewData) {
    self.overviewData = {}
  }
}

const descriptiveStep = () => {}

Given('der User hat sich erfolgreich eingeloggt', async () =>{
  initOverviewData(this)
  const loginResponse = await post('http://localhost:3000/login',{
    email: 'hab@ich.net',
    password: 'll11OO!!'
  }, {
    headers: {
      'x-shared-shopper-secret': 'FAKE_SECRET'
    }
  })
  this.overviewData.accessToken = await loginResponse.data.accessToken
});


Given('der User hat bereits einige Einkaufszettel in der Vergangenheit angelegt', descriptiveStep)


Given('der User verwendet einen ungültigen accessToken', async () => {
  initOverviewData(this)
  this.overviewData.invalidAccessToken = 
    this.overviewData.accessToken
      .split('')
      .reverse()
      .join('')
});


When('der User die Liste aller seiner Einkaufszetten einsehen will', async () => {
  try {
    const response = await get('http://localhost:3000/overview', {
      headers: {
        accessToken: this.overviewData.invalidAccessToken,
        'x-shared-shopper-secret': 'FAKE_SECRET'
      }
    })
    this.lastStatus = await response.status
  } catch (error) {
    this.lastStatus = error.response.status
  }
});

Then('schlägt der overview-Aufruf fehl', async () => {
  expect(this.lastStatus).to.equal(401)
})