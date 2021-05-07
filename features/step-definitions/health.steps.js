const {
  When,
  Then
} = require('@cucumber/cucumber')

const {
  get
} = require('axios').default

const {
  expect
} = require('chai')

When('health ohne x-shared-shopper-secret aufgerufen wird', async () => {
  try {
    await get('http://localhost:3000/health')
  } catch (error) {
    // axios returns here an error which is a good thing, but does not help 
    // for this specific test

    this.lastStatus = error.response.status
  }
})

Then('wird der HTTP-Code {string} zurück gegeben', async (httpCode) => {
  expect(this.lastStatus).to.equal(parseInt(httpCode))
})

When('health aufgerufen wird', async () => {
  const response = await get('http://localhost:3000/health', {
    headers: {
      'x-shared-shopper-secret': 'FAKE_SECRET'
    }
  })
  this.healthResult = await response.data;
})

Then('erfahre ich wie lange der Service schon läuft', async () => {
  expect(this.healthResult.uptime).not.to.be.undefined
})

Then('ob eine Datenbankverbindung existiert', async () => {
  expect(this.healthResult.dbConnection).not.to.be.undefined
})