import axios, { AxiosRequestConfig } from 'axios'
// import { version } from '../../package.json'
import { getClient } from '../'

export function request(config: AxiosRequestConfig = {}) {
  const client = getClient()
  const currentChain = client.currentChain()
  const headers: any = {
    'Content-Type': 'application/json',
    'x-rkc-version': '0.4.0',
  }
  if (currentChain?.apiKey) {
    headers['x-api-key'] = currentChain.apiKey
  }
  return axios.request({ headers: headers, ...config })
}
