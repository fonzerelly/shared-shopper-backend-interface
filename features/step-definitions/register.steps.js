const {
  Given,
  When,
  Then
} = require('@cucumber/cucumber')

const {
  post
} = require('axios').default

const {
  expect
} = require('chai')

const initRegisterData = (self) => {
  if (!self.registerData) {
    self.registerData = {}
  }
}

Given('wir kennen das nächste Validierungstoken', function () {
  initRegisterData(this)
  this.registerData.validierungsToken = '123'
});

Given('wir kennen das nächste Zugriffstoken', function () {
  initRegisterData(this)
  this.registerData.zugriffsToken = '456'
});

When('register mit einer validen email und einem validen passwort aufgerufen wird', async function () {
  initRegisterData(this)
  const registerResponse = await post('http://localhost:3000/register', {
    email: 'hab@ich.net',
    password: '11aaBB!!'
  })
  this.registerData.registerResult = await registerResponse.status
});


Then('wird ein Transaktionsvorgang mit dem Token angelegt', function () {
  expect(this.registerData.registerResult).to.equal(200)
});

Then('im Hintergrund eine Email mit dem verify-link an die email adresse gesendet', function () {
  //Dieser ist nur beschreibender Natur
});