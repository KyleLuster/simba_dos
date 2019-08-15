import axios from 'axios'

const HTTP = axios.create({
  baseURL: 'https://api.simbachain.com/v1-management/',
  headers: {
    'APIKEY': '7ab73fd667a1e3406657c4bbbccdc31314c28044fcee6eee88691b6a0fd57461'
  }
})

export default {
  requestFund (name, data) {
    HTTP.defaults.headers.common['Content-Type'] = 'application/json'
    return HTTP.post(name, data)
  }
}
