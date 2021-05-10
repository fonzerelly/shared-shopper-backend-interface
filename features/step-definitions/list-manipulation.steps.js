const {
  Given,
  When,
  Then
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

Given('der User hat sich eingeloggt um einen Einkaufszettel zu manipulieren', async () => {
  await login(this)
})

Given('der User hat einen neuen Einkaufszettel angelegt', async () => {
  await createShoppingList(this)
});

When('der User sich den neuen Einkaufszettel anzeigen lässt', async () => {
  await readShoppingList(this)
});

Then('ist der Einkaufszettel leer', async () => {
  expect(this.lastNewShoppingListContent.length).to.equal(0)
});

When('der User den neuen Einkaufszettel um einen Eintrag ergänzt', async () => {
  await createShoppingListEntry(this)
});

Then('enthält der Einkaufszettel einen Eintrag', async () => {
  expect(this.lastNewShoppingListContent.length).to.equal(1)
});

Given('der User hat den neuen Einkaufszettel um einen Eintrag ergänzt', async () => {
  await createShoppingListEntry(this)
});

When('der User den neuen Eintrag wieder löscht', async () => {
  await removeShoppingListEntry(this)
});

Given('der User den neuen Einkaufszettel um zwei Einträge ergänzt', async () => {
  await createShoppingListEntry(this, 'Kaba')
  await createShoppingListEntry(this, 'Milch')
});

When('der User den zweiten Eintrag nach oben schiebt', async () => {
  await moveUpShoppingListEntry(this)
});

Then('sind die Plätze beider Einträge vertauscht', async () => {
  const Kaba = this.lastNewShoppingListContent.find((entry) => entry.label === 'Kaba')
  const Milch = this.lastNewShoppingListContent.find((entry) => entry.label === 'Milch')
  expect(Milch.position).to.be.lessThan(Kaba.position)
});

When('der User den ersten Eintrag nach unten schiebt', async () => {
  await readShoppingList(this)
  const firstEntry = this.lastNewShoppingListContent[0]
  await moveDownShoppingListEntry(this, firstEntry.id)
});

When('der User den zweiten Eintrag markiert', async () => {
  await readShoppingList(this)
  const firstEntry = this.lastNewShoppingListContent[0]
  await markShoppingListEntry(this, firstEntry.id)
});

Then('ist dieser Eintrag markiert', async () => {
  const firstEntry = this.lastNewShoppingListContent[0]
  expect(firstEntry.marked).to.be.true
});

When('der User die Anzahl des Eintrags auf {int} setzt', async (newCount) => {
  await setShoppingListEntriesCount(this, newCount)
});

Then('hat steht die Anzahl des Eintrags auf {int}', async (newCount) => {
  const firstEntry = this.lastNewShoppingListContent[0]
  expect(firstEntry.count).to.equal(newCount)
});