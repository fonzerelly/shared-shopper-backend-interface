const axios = require('axios')
const { post, get, put } = axios
const del = axios.delete

const createHeaders = accessToken => ({
  'x-shared-shopper-secret': 'FAKE_SECRET',
  authorization: accessToken,
  'Content-Type': 'application/json'
})

const login = async () => {
  const loginResponse = await post('http://localhost:3000/login',{
    email: 'hab@ich.net',
    password: 'll11OO!!'
  }, {
    headers: {
      'x-shared-shopper-secret': 'FAKE_SECRET',
      'Content-Type': 'application/json'
    }
  })
  return await loginResponse.data
}

const createShoppingList = async (accessToken) => {
  const newShoppingListName = new Date().toISOString()
  const response = await post('http://localhost:3000/overview/add', {
    name: newShoppingListName
  }, {
    headers: createHeaders(accessToken)
  })
  return {
    status: await response.status,
    newShoppinglist: await response.data
  }
}

const readShoppingList = async (accessToken, shoppingListId) => {
  const response = await get (`http://localhost:3000/shoppinglist/${shoppingListId}`, {
    headers: {
      'x-shared-shopper-secret': 'FAKE_SECRET',
      authorization: accessToken
    }
  })
  
  return {
    status: await response.status,
    shoppinglistContent: await response.data
  }
}

const createShoppingListEntry = async (accessToken, shoppingListId, label = 'Kaffe') => {
  const response = await post (`http://localhost:3000/shoppinglist/${shoppingListId}/add`, {
    label,
    count: 1
  }, {
    headers: createHeaders(accessToken)
  })
  return {
    status: await response.status,
    newShoppinglistEntry: await response.data
  }
}

const removeShoppingListEntry = async (accessToken, shoppingListId, entryId) => {
  const response = await del (`http://localhost:3000/shoppinglist/${shoppingListId}/${entryId}`, {
    headers: {
      'x-shared-shopper-secret': 'FAKE_SECRET',
      authorization: accessToken
    }
  })
  return { status: await response.status }
}

const moveUpShoppingListEntry = async (accessToken, shoppingListId, entryId) => {
  const response = await put (
    `http://localhost:3000/shoppinglist/${shoppingListId}/${entryId}/moveUp`, 
    null, 
    {
      headers: createHeaders(accessToken)
    }
  )
  return { status: await response.status }
}

const moveDownShoppingListEntry = async (accessToken, shoppingListId, entryId) => {
  const response = await put (
    `http://localhost:3000/shoppinglist/${shoppingListId}/${entryId}/moveDown`, 
    null, 
    {
      headers: createHeaders(accessToken)
    }
  )
  return { status: await response.status }
}

const markShoppingListEntry = async (accessToken, shoppingListId, entryId) => {
  const response = await put (
    `http://localhost:3000/shoppinglist/${shoppingListId}/${entryId}/mark`, 
    null, 
    {
      headers: createHeaders(accessToken)
    }
  )
  return { status: await response.status }
}

const setShoppingListEntriesCount = async (accessToken, shoppingListId, entryId, newCount) => {
  const response = await put (
    `http://localhost:3000/shoppinglist/${shoppingListId}/${entryId}/count`, 
    { newCount }, 
    {
      headers: createHeaders(accessToken)
    }
  )
  return { status: await response.status }
}

module.exports = {
  login,
  createShoppingList,
  readShoppingList,
  createShoppingListEntry,
  removeShoppingListEntry,
  moveUpShoppingListEntry,
  moveDownShoppingListEntry,
  markShoppingListEntry,
  setShoppingListEntriesCount
}
