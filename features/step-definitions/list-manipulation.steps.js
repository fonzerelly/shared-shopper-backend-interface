const {Given, When, Then} = require('@cucumber/cucumber')

const {expect} = require('chai')

const {
  login,
  createShoppingList,
  readShoppingList,
  createShoppingListEntry,
  removeShoppingListEntry,
  moveUpShoppingListEntry
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

Then('ist dieser Eintrag der erste in der Liste', async () => {
  const Kaba = this.lastNewShoppingListContent.find((entry) => entry.label ==='Kaba')
  const Milch = this.lastNewShoppingListContent.find((entry) => entry.label ==='Milch')
  expect(Milch.position).to.be.lessThan(Kaba.position)
});
