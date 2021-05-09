const axios = require('axios')
const { post, get } = axios
const del = axios.delete

const login = async (self) => {
  const loginResponse = await post('http://localhost:3000/login',{
    email: 'hab@ich.net',
    password: 'll11OO!!'
  }, {
    headers: {
      'x-shared-shopper-secret': 'FAKE_SECRET'
    }
  })
  self.accessToken = await loginResponse.data.accessToken
}

const createShoppingList = async (self) => {
  const newShoppingListName = new Date().toISOString()
  const response = await post('http://localhost:3000/overview/add', {
    name: newShoppingListName
  }, {
    headers: {
      'x-shared-shopper-secret': 'FAKE_SECRET',
      authorization: self.accessToken
    }
  })
  self.lastNewShoppingList = await response.data
}

const readShoppingList = async (self) => {
  const response = await get (`http://localhost:3000/shoppinglist/${self.lastNewShoppingList.id}`, {
    headers: {
      'x-shared-shopper-secret': 'FAKE_SECRET',
      authorization: self.accessToken
    }
  })
  self.lastNewShoppingListContent = await response.data
}

const createShoppingListEntry = async (self) => {
  const response = await post (`http://localhost:3000/shoppinglist/${self.lastNewShoppingList.id}/add`, {
    label: 'Kaffe',
    count: 1
  }, {
    headers: {
      'x-shared-shopper-secret': 'FAKE_SECRET',
      authorization: self.accessToken
    }
  })
  self.lastNewShoppingListEntry = await response.data
}

const removeShoppingListEntry = async (self) => {
  const response = await del (`http://localhost:3000/shoppinglist/${self.lastNewShoppingList.id}/${self.lastNewShoppingListEntry.id}`, {
    headers: {
      'x-shared-shopper-secret': 'FAKE_SECRET',
      authorization: self.accessToken
    }
  })
}

module.exports = {
  login,
  createShoppingList,
  readShoppingList,
  createShoppingListEntry,
  removeShoppingListEntry,
}
