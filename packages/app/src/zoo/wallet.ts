import { ethers, Contract } from 'ethers'
import root from 'window-or-global'

const ZooToken = require('./contracts/ZooToken.json')

import {quickFormPromise} from './form'
import API from './api'

const api = new API()

async function connectWallet () {
  console.log('connectWallet')
  if (!root.ethereum) {
    return {
      success: false,
      address: '',
      status: `
        <span>
          <p>
            <a target='_blank' rel='noreferrer' href='https://metamask.io/download.html'>
              Please install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>`
    }
  }

  try {
    console.log('getting provider')
    const provider = new ethers.providers.Web3Provider(root.ethereum)
    const signer = provider.getSigner()

    const accounts = await provider.send('eth_requestAccounts', [])
    const address  = await signer.getAddress()

    console.log('accounts', accounts)
    console.log('address', address)

    return {
      success: true,
      status: 'Wallet Connected.',
      address: address,
      provider: provider,
      signer: signer,
    }
  } catch (err) {
    return {
      success: false,
      address: '',
      status: '😥 ' + err.message
    }
  }
}

export async function metamaskLogin() {
  const wallet = await connectWallet()

  // Bail out if we can't connect to wallet
  if (!wallet.success) {
    quickFormPromise(wallet.status, {}, 'Ok')
    return null
  }

  // Zoo Token
  const tokenAddress = '0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997';
  const tokenAbi = ZooToken.abi

  const web3Status    = wallet.status
  const contract      = new Contract(tokenAddress, tokenAbi, wallet.provider)
  const balance       = (await contract.balanceOf(wallet.address)).toString()
  const symbol        = await contract.symbol()
  const name          = await contract.name()
  const contractOwner = await contract.owner()

  console.log('symbol', symbol, 'name', name, 'contractOwner', contractOwner, 'balance', balance, 'wallet.address', wallet.address)

  // TODO: Remove backend code
  const existingRecord = await fetch(`/users/${wallet.address}`).then(resp => resp.json())

  let userdata;
  if (existingRecord && existingRecord.user) {
    userdata = existingRecord.user
  } else {
    const newUserData = await api.post('/users/registermm', { mmid: wallet.address })
    userdata = newUserData.user
  }

  // Update balance
  userdata.zooBalance = balance
  localStorage.czUser = JSON.stringify(userdata)

  // Logged in
  location.href = '/feed'

  return {
    balance,
    symbol,
    name,
    contractOwner,
    web3Status
  }
}
