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

When('health aufgerufen wird', async () => {
  const response = await get('http://localhost:3000/health')
  this.healthResult = await response.data;
});

Then('erfahre ich wie lange der Service schon läuft', () => {
  expect(this.healthResult.uptime).not.to.be.undefined
});

Then('ob eine Datenbankverbindung existiert', () => {
  expect(this.healthResult.dbConnection).not.to.be.undefined
})