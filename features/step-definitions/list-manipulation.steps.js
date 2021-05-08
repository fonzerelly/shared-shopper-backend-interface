const {Given, When, Then} = require('@cucumber/cucumber')

const {expect} = require('chai')

const {login, createShoppingList, readShoppingList} = require('../helpers/shoppinglist')

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

