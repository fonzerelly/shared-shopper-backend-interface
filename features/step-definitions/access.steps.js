const {
  Given,
  When,
  Then,
  Before,
} = require('@cucumber/cucumber')

const {
  get,
  post
} = require('axios').default

const {
  expect
} = require('chai')

const descriptiveStep = () => {}

let scenarioLabel
Before((scenario) => {
  scenarioLabel = scenario.pickle.name
})

When('register mit einer validen email und einem validen passwort aufgerufen wird', async () => {
  const registerResponse = await post('http://localhost:3000/register', {
    email: 'hab@ich.net',
    password: '11aaBB!!'
  },{
    headers: {
      'x-shared-shopper-secret': 'FAKE_SECRET'
    }
  })
  this[scenarioLabel] = await registerResponse.status
});


Then('wird ein Transaktionsvorgang mit dem Token angelegt', async () => {
  expect(this[scenarioLabel]).to.equal(200)
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

Given('der Kunde hat sich freigeschalten', descriptiveStep)

When('der Kunde sich mit seinem Passwort anmeldet', async () => {
  const loginResponse = await post('http://localhost:3000/login', {
    email: 'hab@ich.net',
    password: '11aaBB!!'
  },{
    headers: {
      'x-shared-shopper-secret': 'FAKE_SECRET'
    }
  })
  this[scenarioLabel] = {
    status: await loginResponse.status,
    accessToken: await loginResponse.data.accessToken
  }
});

Then('erhält der Kunde das Zugriffstoken', async () => {
  expect(this[scenarioLabel].status).to.equal(200)
  expect(this[scenarioLabel].accessToken).not.to.be.undefined
});
