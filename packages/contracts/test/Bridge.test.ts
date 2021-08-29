import { setupTestFactory, requireDependencies } from './utils'
import { Signer } from '@ethersproject/abstract-signer'
import { Bridge, ZooTokenV2 } from '../types'

import { ethers, deployments } from 'hardhat'
const { expect } = requireDependencies()

const setupTest = setupTestFactory(['Bridge', 'ZooTokenV2'])

const generateTokens = (token: any, count: number = 2) => {
  // Lame version
  let tokens = []
  for (let i = 0; i < count; i++) {
    tokens.push({
      kind: 0,
      id: i,
      chainID: 1337 + i,
      tokenAddress: token.address,
      enabled: true,
    })
  }
  return tokens
}

describe.only('Bridge', function () {
  it('it should swap tokens', async function () {
    const { signers, tokens } = await setupTest()

    const bridge = tokens.Bridge
    const token = tokens.ZooTokenV2

    const [user1, user2] = signers
    const address1 = user1.address
    const address2 = user2.address

    // Mint tokens to user1
    token.mint(address1, 10000)
    await token.approve(bridge.address, 200)

    const [tokenA, tokenB] = generateTokens(token, 2)
    await bridge.setToken(tokenA)
    await bridge.setToken(tokenB)

    await expect(bridge.swap(tokenA, tokenB, address2, 100, 1)).to.not.be.rejected
  })

  it('explodes if not approved', async () => {
    const {
      signers,
      tokens: { Bridge, ZooTokenV2 },
    } = await setupTest()
    const [user1, user2] = signers
    ZooTokenV2.mint(user1.address, 100)

    const [tokenA, tokenB] = generateTokens(ZooTokenV2, 2)

    await Bridge.setToken(tokenA)
    await Bridge.setToken(tokenB)
    await expect(Bridge.swap(tokenA, tokenB, user2.address, 100, 1))
    .to.rejectedWith('ERC20: burn amount exceeds allowance')
  })
})
