const {
  Given,
  When,
  Then,
  Before
} = require('@cucumber/cucumber')

const {
  expect
} = require('chai')

const {
  login,
  createShoppingList,
  readShoppingList,
  createShoppingListEntry,
  removeShoppingListEntry,
  moveUpShoppingListEntry,
  moveDownShoppingListEntry,
  markShoppingListEntry,
  setShoppingListEntriesCount
} = require('../helpers/shoppinglist')

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

Given('der User hat sich eingeloggt um einen Einkaufszettel zu manipulieren', async () => {
  extendThis(await login())
})

Given('der User hat einen neuen Einkaufszettel angelegt', async () => {
  const{ accessToken } = this[scenarioLabel]
  extendThis(await createShoppingList(accessToken))
})

When('der User sich den neuen Einkaufszettel anzeigen lässt', async () => {
  const { accessToken, newShoppinglist } = this[scenarioLabel]
  extendThis(await readShoppingList(accessToken, newShoppinglist.id))
})

Then('ist der Einkaufszettel leer', async () => {
  const { shoppinglistContent } = this[scenarioLabel]
  expect(shoppinglistContent.length).to.equal(0)
})

When('der User den neuen Einkaufszettel um einen Eintrag ergänzt', async () => {
  const { accessToken, newShoppinglist } = this [scenarioLabel]
  const product = 'Fisch'
  extendThis({product})
  extendThis(await createShoppingListEntry(accessToken, newShoppinglist.id, product))
})

Then('zeigt der HTTP-status Erfolg an', () => {
  expect(this[scenarioLabel].status).to.equal(200)
})

Then('entspricht das Label des Eintrags dem Produktnamen', async () => {
  const { newShoppinglistEntry, product } = this[scenarioLabel]
  expect(newShoppinglistEntry.label).to.equal(product)
})

Then('enthält der Einkaufszettel einen Eintrag', async () => {
  const { shoppinglistContent } = this[scenarioLabel]
  expect(shoppinglistContent.length).to.equal(1)
})

Given('der User hat den neuen Einkaufszettel um einen Eintrag ergänzt', async () => {
  const { accessToken, newShoppinglist } = this [scenarioLabel]
  extendThis(await createShoppingListEntry(accessToken, newShoppinglist.id))
})

When('der User den neuen Eintrag wieder löscht', async () => {
  const { accessToken, newShoppinglist, newShoppinglistEntry} = this [scenarioLabel]
  extendThis(
    await removeShoppingListEntry(accessToken, newShoppinglist.id, newShoppinglistEntry.id)
  )
})

Given('der User den neuen Einkaufszettel um zwei Einträge ergänzt', async () => {
  const { accessToken, newShoppinglist } = this [scenarioLabel]
  this[scenarioLabel].firstEntry = 
    (await createShoppingListEntry(accessToken, newShoppinglist.id, 'Kaba'))
      .newShoppinglistEntry
  this[scenarioLabel].secondEntry = 
    (await createShoppingListEntry(accessToken, newShoppinglist.id, 'Milch'))
      .newShoppinglistEntry
})

When('der User den zweiten Eintrag nach oben schiebt', async () => {
  const {accessToken, newShoppinglist, secondEntry} = this[scenarioLabel]
  extendThis(
    await moveUpShoppingListEntry(accessToken, newShoppinglist.id, secondEntry.id)
  )
})

Then('sind die Plätze beider Einträge vertauscht', async () => {
  const {firstEntry, secondEntry, shoppinglistContent} = this[scenarioLabel]
  const first = shoppinglistContent.find((entry) => entry.id === firstEntry.id)
  const second = shoppinglistContent.find((entry) => entry.id === secondEntry.id)
  expect(second.position).to.be.lessThan(first.position)
})

When('der User den ersten Eintrag nach unten schiebt', async () => {
  const{accessToken, newShoppinglist,firstEntry} = this[scenarioLabel]
  extendThis(
    await moveDownShoppingListEntry(accessToken, newShoppinglist.id, firstEntry.id)
  )
})

When('der User den Eintrag markiert', async () => {
  const {accessToken, newShoppinglist, newShoppinglistEntry} = this[scenarioLabel]
  await markShoppingListEntry(accessToken, newShoppinglist.id, newShoppinglistEntry.id)
});

Then('ist dieser Eintrag markiert', async () => {
  const {shoppinglistContent, newShoppinglistEntry} = this[scenarioLabel]
  const second = shoppinglistContent.find(entry => entry.id === newShoppinglistEntry.id)
  expect(second.marked).to.be.true
});

When('der User die Anzahl des Eintrags auf {int} setzt', async (newCount) => {
  const {accessToken, newShoppinglist, newShoppinglistEntry} = this[scenarioLabel]
  await setShoppingListEntriesCount(accessToken, newShoppinglist.id, newShoppinglistEntry.id, newCount)
});

Then('steht die Anzahl des Eintrags auf {int}', async (newCount) => {
  const {shoppinglistContent} = this[scenarioLabel]
  expect(shoppinglistContent[0].count).to.equal(newCount)
});

//some commit to test