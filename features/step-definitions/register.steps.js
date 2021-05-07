const {
  Given,
  When,
  Then
} = require('@cucumber/cucumber')

const {
  get,
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

const descriptiveStep = () => {}

Given('wir kennen das nächste Validierungstoken', async () => {
  initRegisterData(this)
  this.registerData.validierungsToken = '123'
});

Given('wir kennen das nächste Zugriffstoken', async () => {
  initRegisterData(this)
  this.registerData.zugriffsToken = '456'
});

When('register mit einer validen email und einem validen passwort aufgerufen wird', async () => {
  initRegisterData(this)
  const registerResponse = await post('http://localhost:3000/register', {
    email: 'hab@ich.net',
    password: '11aaBB!!'
  },{
    headers: {
      'x-shared-shopper-secret': 'FAKE_SECRET'
    }
  })
  this.registerData.registerResult = await registerResponse.status
});


Then('wird ein Transaktionsvorgang mit dem Token angelegt', async () => {
  expect(this.registerData.registerResult).to.equal(200)
});

Then('im Hintergrund eine Email mit dem verify-link an die email adresse gesendet', descriptiveStep);

Given('der Kunde hat sich zuvor registriert', descriptiveStep);

When('validate mit dem Token aufgerufen wird', async () => {
  await get('http://localhost:3000/validate/123abc456', {
    headers: {
      'x-shared-shopper-secret': 'FAKE_SECRET'
    }
  })
});

Then('wird der login für den Kunden freigeschalten', descriptiveStep);