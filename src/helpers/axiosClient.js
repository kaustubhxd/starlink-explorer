import axios from 'axios'

const URL = process.env.REACT_APP_API_URL
const VERSION = process.env.REACT_APP_API_VERSION

console.log(URL, VERSION)

const client = axios.create({
  baseURL: `${URL}/${VERSION}`
})

const setAuthHeader = (token) => {
  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete client.defaults.headers.common.Authorization
  }
}

export {
  client,
  setAuthHeader
}
