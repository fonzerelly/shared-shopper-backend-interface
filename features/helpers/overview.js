const axios = require('axios')
const { get } = axios
const del = axios.delete

const createHeaders = (accessToken) => ({
  authorization: accessToken,
  'x-shared-shopper-secret': 'FAKE_SECRET',
  'Content-Type': 'application/json'
})

const readOverview = async (accessToken) => {
  try {
    const response = await get('http://localhost:3000/overview', {
      headers: createHeaders(accessToken)
    })
    return {
      status: await response.status,
      overview: await response.data
    }
  } catch (error) {
    return {
      status: error.response.status
    }
  }
}

const deleteShoppinglist = async (accessToken, deletedId) => {
  const response = await del(`http://localhost:3000/overview/${deletedId}`, {
    headers: createHeaders(accessToken)
  })
  return {
    status: await response.status,    
  }
}

module.exports = {
  readOverview,
  deleteShoppinglist
}