// TODO: Remove calls to Node backend
export default class API {
  endpoints: any

  constructor(){
    this.endpoints = {}
  }

  // Private methods
  async _handleResponse(response) {
    if (!response.ok) {
      return {
        error: {
          status: response.status,
          message: response.statusText
        }
      }
    } else {
      const resp = await response.json()
      let obj
      if (typeof resp === 'object') obj = resp
      else obj = JSON.parse(resp)

      return obj;
    }
  }

  // Public methods
  async delete(url, data) {
    const body = typeof data === 'string' ? data : JSON.stringify(data),
      response = await fetch(url, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      cache: 'no-cache',
      body
    })
    return this._handleResponse(response)
  }

  async get(url) {
    const response = await fetch(url)
    return this._handleResponse(response)
  }

  async post(url, data) {
    const body = typeof data === 'string' ? data : JSON.stringify(data),
      response = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      cache: 'no-cache',
      body
    })
    return this._handleResponse(response)
  }

  async put(url, data) {
    const body = typeof data === 'string' ? data : JSON.stringify(data),
      response = await fetch(url, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      cache: 'no-cache',
      body
    })
    return this._handleResponse(response)
  }

  getParameterizedEndpoint(name, data) {
    const url = this.endpoints[name].urlBuilder(data)
    return this.get(url)
  }

  registerParameterizedEndpoint(name, urlBuilder) {
    this.endpoints[name] = {
      urlBuilder
    }
  }
}
