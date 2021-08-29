import { setupTestFactory, requireDependencies } from './utils'
import { Signer } from '@ethersproject/abstract-signer'
import { Bridge, ZooTokenV2 } from '../types'

const { expect } = requireDependencies()

const setupTest = setupTestFactory(['Bridge', 'ZooTokenV2'])

describe.only('Bridge', function () {
  it('it should swap tokens', async function () {
    const { signers, tokens } = await setupTest()

    const bridge = tokens.Bridge
    const token = tokens.ZooTokenV2

    const [user1, user2] = signers
    console.log('user1', user1.address)
    const address1 = user1.address
    const address2 = user2.address

    console.log('minting')
    // Mint tokens to user1
    token.mint(String(user1), 10000)

    const tokenA = {
      kind: 0,
      id: 0,
      chainID: 1337,
      tokenAddress: token.address,
      enabled: true,
    }

    const tokenB = {
      kind: 0,
      id: 1,
      chainID: 1338,
      tokenAddress: token.address,
      enabled: true,
    }

    await bridge.setToken(tokenA)
    await bridge.setToken(tokenB)
    await bridge.swap(tokenA, tokenB, address2, 100, 1)
  })
})
