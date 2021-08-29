import { requireDependencies, setupTestFactory } from './utils'

const { expect } = requireDependencies()

const setupTest = setupTestFactory(['Bridge', 'ZooV2'])

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

interface TokenCustomizations {
  kind?: number;
  id?: number;
  chainID?: string | number;
  tokenAddress?: string;
  enabled?: boolean;
};

const getTokenDefaults = (token: any, i: number): TokenCustomizations => ({
  kind: 0,
  id: i,
  chainID: 1337 + i,
  tokenAddress: token.address,
  enabled: true,
})

const generateTokens = (token: any, count: number = 2, custom: TokenCustomizations = {}) => {
  // Lame version
  let tokens = []
  for (let i = 0; i < count; i++) {
    custom = {...getTokenDefaults(token, i), ...custom}
    tokens.push({
      kind: custom.kind,
      id: custom.id,
      chainID: custom.chainID,
      tokenAddress: custom.tokenAddress,
      enabled: custom.enabled,
    })
  }
  return tokens
}

describe.only('Bridge', function () {

    const bridge = tokens.Bridge
    const token = tokens.ZooV2
    token.configure(bridge.address)

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
      tokens: { Bridge, ZooV2 },
    } = await setupTest()
    const [user1, user2] = signers
    ZooV2.mint(user1.address, 100)
    ZooV2.configure(Bridge.address)

    const [tokenA, tokenB] = generateTokens(ZooV2, 2, {})

    await Bridge.setToken(tokenA)
    await Bridge.setToken(tokenB)
    await expect(Bridge.swap(tokenA, tokenB, user2.address, 100, 1)).to.rejectedWith('ERC20: burn amount exceeds allowance')
  })

  describe('setToken', async () => {
    it('allows owner to set token', async () => {
      const { tokens: { Bridge, ZooV2 } } = await setupTest();
      const [tokenA] = generateTokens(ZooV2, 1)
      ZooV2.configure(Bridge.address);
      await expect(Bridge.setToken(tokenA)).to.not.be.rejected;
    })
    it('forbigs setting Chain ID to address 0', async () => {
      const { tokens: { Bridge, ZooV2 } } = await setupTest();
      const [tokenA] = generateTokens(ZooV2, 1, {chainID: ZERO_ADDRESS})
      ZooV2.configure(Bridge.address);
      await expect(Bridge.setToken(tokenA)).to.be.rejectedWith('Chain ID must not be zero')
    })
    it('forbigs setting token address to address 0', async () => {
      const { tokens: { Bridge, ZooV2 } } = await setupTest();
      const [tokenA] = generateTokens(ZooV2, 1, {tokenAddress: ZERO_ADDRESS})
      ZooV2.configure(Bridge.address);
      await expect(Bridge.setToken(tokenA)).to.be.rejectedWith('Token address must not be zero')
    })
    it('forbids any non-owner permission', async () => {
      const {
        signers,
        tokens: { Bridge, ZooV2 },
      } = await setupTest()
      const [_user1, user2] = signers
      const [tokenA] = generateTokens(ZooV2, 1)
      ZooV2.configure(Bridge.address)
      const bridge = Bridge.connect(user2)

      await expect(bridge.setToken(tokenA)).to.be.rejectedWith('Ownable: caller is not the owner')
    })
  })
  describe('swap', async () => {
    let bridge: any;
    let token: any;
    let signers: any[];
    let execGoodSwap: () => Promise<any>;

    beforeEach(async () => {
      const { signers: s, owner, tokens: { Bridge, ZooV2 } } = await setupTest();
      signers = s;
      bridge = Bridge;
      token = ZooV2;
      token.configure(bridge.address);
      await token.mint(s[0].address, 1000);

      execGoodSwap = async () => {
      const [user1] = signers;
      const [tokenA, tokenB] = generateTokens(token, 2, {})

      await bridge.setToken(tokenA);
      await bridge.setToken(tokenB);
      await token.approve(bridge.address, 200)

      const txn = await bridge.swap(tokenA, tokenB, user1.address, 100, 1);
      const tx = await txn.wait();
      return tx;
      }
    })

      // bridge.mint(token, s[0].address, 1000);
    it('cannot swap tokens on a different chainID', async () => {
      const [user1] = signers;
      const [tokenA] = generateTokens(token, 2, {chainID: 1338})
      bridge.setToken(token);
      bridge.setToken(tokenA);

      await token.approve(bridge.address, 200)
      await expect(bridge.swap(token, tokenA, user1.address, 100, 1)).to.be.rejectedWith("Not tokens we can swap")
    });

    it('cannot swap a disabled token', async () => {
      const [user1, user2, user3] = signers;
      const [tokenA] = generateTokens(token, 1, {enabled: false, tokenAddress: user2.address})
      const [tokenB] = generateTokens(token, 1, {enabled: true, tokenAddress: user3.address})
      await bridge.setToken(tokenA);
      await bridge.setToken(tokenB);

      await token.approve(bridge.address, 200)

      await expect(
        bridge.swap(tokenA, tokenB, user1.address, 100, 1)
      ).to.be.rejectedWith("Swap from token not enabled")
    });

    it('cannot swap to a disabled token', async () => {
      const [user1, user2, user3] = signers;
      const [tokenA] = generateTokens(token, 1, {enabled: true, tokenAddress: user2.address})
      const [tokenB] = generateTokens(token, 1, {enabled: false, tokenAddress: user3.address})
      await bridge.setToken(tokenA);
      await bridge.setToken(tokenB);

      await token.approve(bridge.address, 200)

      await expect(
        bridge.swap(tokenA, tokenB, user1.address, 100, 1)
      ).to.be.rejectedWith("Swap to token not enabled")
    });

    it('can only swap a greater than zero amount', async () => {
      const [user1] = signers;
      await token.approve(bridge.address, 200)
      const [tokenA, tokenB] = generateTokens(token, 2, {})

      bridge.setToken(tokenA);
      bridge.setToken(tokenB);

      await expect(
        bridge.swap(tokenA, tokenB, user1.address, 0, 2)
      ).to.be.rejectedWith("Amount must be greater than zero")
    });

    it('can only to a non-zero account', async () => {
      const [user1] = signers;
      const [tokenA, tokenB] = generateTokens(token, 2, {})
      bridge.setToken(tokenA);
      bridge.setToken(tokenB);
      await token.approve(bridge.address, 200)

      await expect(
        bridge.swap(tokenA, tokenB, user1.address, 0, 1)
      ).to.be.rejectedWith("Amount must be greater than zero")
    });

    it('enforces nonce as a 1-time use', async () => {
      const [user1] = signers;
      const [tokenA, tokenB] = generateTokens(token, 2, {})
      bridge.setToken(tokenA);
      bridge.setToken(tokenB);
      await token.approve(bridge.address, 200)

      await bridge.swap(tokenA, tokenB, user1.address, 100, 1)
      await expect(
        bridge.swap(tokenA, tokenB, user1.address, 100, 1)
      ).to.be.rejectedWith("Nonce already used")
    });

    it('it should swap tokens', async function () {
      const { signers, tokens } = await setupTest()

      const bridge = tokens.Bridge
      const token = tokens.ZooV2
      token.configure(bridge.address)

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

    it('throws a swap event with a successful swap', async () => {
      const tx = await execGoodSwap();

      expect(tx).not.to.be.null;
      expect(tx.events).not.to.be.null
      expect(tx.events[0].event).to.be.eql("Swap");
    })

    it('throws a burn event if the from token is on the current chain', async () => {
      const tx = await execGoodSwap();

      expect(tx).not.to.be.null;
      expect(tx.events).not.to.be.null
      expect(tx.events[1].event).to.be.eql("Burn");
    });

    it('throws a mint event if the from token is on a different chain', async () => {
      const [user1] = signers;
      const [tokenA] = generateTokens(token, 1, {chainID: 1338})
      const [tokenB] = generateTokens(token, 1, {})

      await bridge.setToken(tokenA);
      await bridge.setToken(tokenB);
      await token.approve(bridge.address, 200)

      const txn = await bridge.swap(tokenA, tokenB, user1.address, 100, 1);
      const tx = await txn.wait();

      expect(tx.events[1].event).to.be.eql("Mint");
    })

  });
})
