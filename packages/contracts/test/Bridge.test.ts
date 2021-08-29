import { requireDependencies, setupTestFactory } from './utils'

const { expect } = requireDependencies()

const setupTest = setupTestFactory(['Bridge', 'ZooTokenV2'])

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

const generateTokens = (token: any, count: number = 2, customAddr: string = null) => {
  // Lame version
  let tokens = []
  for (let i = 0; i < count; i++) {
    tokens.push({
      kind: 0,
      id: i,
      chainID: 1337 + i,
      tokenAddress: customAddr || token.address,
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
    token.configure(bridge.address);

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
    ZooTokenV2.configure(Bridge.address);

    const [tokenA, tokenB] = generateTokens(ZooTokenV2, 2)

    await Bridge.setToken(tokenA)
    await Bridge.setToken(tokenB)
    await expect(Bridge.swap(tokenA, tokenB, user2.address, 100, 1)).to.rejectedWith('ERC20: burn amount exceeds allowance')
  })

  it('does not allow setting token to 0x0', async () => {
const {
      tokens: { Bridge, ZooTokenV2 },
    } = await setupTest()
    const [tokenA] = generateTokens(ZooTokenV2, 2, ZERO_ADDRESS)

    await expect(Bridge.setToken(tokenA)).to.rejectedWith('Token address must not be zero')

  })

  it('only allows the owner to call setToken', async () => {
    const {
      signers,
      tokens: { Bridge, ZooTokenV2 },
    } = await setupTest()
    const [_user1, user2] = signers
    const [tokenA] = generateTokens(ZooTokenV2, 1)
    ZooTokenV2.configure(Bridge.address);
    const bridge = Bridge.connect(user2);

    await expect(bridge.setToken(tokenA)).to.be.rejectedWith('Ownable: caller is not the owner')
  })
})
