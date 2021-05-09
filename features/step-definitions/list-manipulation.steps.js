const {Given, When, Then} = require('@cucumber/cucumber')

const {expect} = require('chai')

const {
  login,
  createShoppingList,
  readShoppingList,
  createShoppingListEntry,
  removeShoppingListEntry
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
