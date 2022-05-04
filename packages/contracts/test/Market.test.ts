import { ethers } from 'hardhat'
import chai, { expect } from 'chai'
import asPromised from 'chai-as-promised'
chai.use(asPromised)

import { BigNumber, BigNumberish, Wallet } from 'ethers'
import { AddressZero, MaxUint256 } from '@ethersproject/constants'
import { JsonRpcProvider } from '@ethersproject/providers'
import { formatUnits } from '@ethersproject/units'

import Decimal from '../utils/Decimal'
import { generatedWallets } from '../utils/generatedWallets'

import { Market } from '../types/Market'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { sha256 } from 'ethers/lib/utils'

let provider = new JsonRpcProvider()

type DecimalValue = { value: BigNumber }

type BidShares = {
  owner: DecimalValue
  prevOwner: DecimalValue
  creator: DecimalValue
}

type Ask = { amount: BigNumberish; currency: string; offline: boolean; }

type Bid = { amount: BigNumberish; currency: string; bidder: string; recipient: string; sellOnShare: { value: BigNumberish; }; offline: boolean; }

describe('Market', async () => {
  // let [deployerWallet, bidderWallet, mockTokenWallet, otherWallet] = generatedWallets(provider)
  const [deployerWallet, bidderWallet, mockTokenWallet, otherWallet] = await ethers.getSigners()
  
  let defaultBidShares = {
    prevOwner: Decimal.new(10),
    owner: Decimal.new(80),
    creator: Decimal.new(10),
  }

  let metadataHex = ethers.utils.formatBytes32String('{}')
  let metadataHash = await sha256(metadataHex)
  let metadataHashBytes = ethers.utils.arrayify(metadataHash)

  let metadataHex2 = ethers.utils.formatBytes32String('{2}')
  let metadataHas2h = await sha256(metadataHex2)
  let metadataHashBytes2 = ethers.utils.arrayify(metadataHas2h)

  const data = {
    tokenURI: 'tokenUri',
    metadataURI: 'metadataUri',
    contentHash: metadataHashBytes,
    metadataHash: metadataHashBytes,
  }

  const dataTwo = {
    tokenURI: 'tokenUri2',
    metadataURI: 'metadataUri2',
    contentHash: metadataHashBytes2,
    metadataHash: metadataHashBytes2,
  }

  let defaultTokenId = 1
  let defaultAsk = {
    amount: 100,
    currency: '0x41A322b28D0fF354040e2CbC676F0320d8c8850d',
    sellOnShare: Decimal.new(0),
    offline: false
  }

  let marketAddress: string
  let mediaAddress: string
  let tokenAddress: string
  let zookeeperAddress: string

  let market
  let media
  let token
  let zookeeper

  function toNumWei(val: BigNumber) {
    return parseFloat(formatUnits(val, 'wei'))
  }

  function toNumEther(val: BigNumber) {
    return parseFloat(formatUnits(val, 'ether'))
  }

  async function maketAs(wallet: Wallet | SignerWithAddress) {
    return market.connect(wallet)
  }

  async function deploy() {
    token = await (await (await ethers.getContractFactory('ZOO')).deploy()).deployed()
    tokenAddress = token.address

    market = await (await (await ethers.getContractFactory('Market')).deploy()).deployed()
    marketAddress = market.address

    media = await (await (await ethers.getContractFactory('Media')).deploy('ZooAnimals', 'ANML')).deployed()
    mediaAddress = media.address

    zookeeper = await (await (await ethers.getContractFactory('ZooKeeper')).deploy()).deployed()
    zookeeperAddress = zookeeper.address

    market.connect(deployerWallet).configure(mediaAddress)
  }

  async function configure() {
    return market.connect(deployerWallet).configure(mediaAddress)
  }

  async function readMedia() {
    return market.connect(deployerWallet).mediaContract()
  }

  async function setBidShares(maket: Market, tokenId: number, bidShares?: BidShares) {
    return maket.setBidShares(tokenId, bidShares)
  }

  async function setAsk(maket: Market, tokenId: number, ask?: Ask) {
    return maket.setAsk(tokenId, ask)
  }

  async function deployCurrency() {
    const currency = await (await ethers.getContractFactory('ZOO')).deploy()
    return {
      address: currency.address,
      contract: currency,
    }
  }

  async function mintCurrency(to: string, value: number) {
    await token.connect(deployerWallet).mint(to, value)
  }

  async function approveCurrency(spender: string, owner: Wallet | SignerWithAddress) {
    await token.connect(owner).approve(spender, MaxUint256)
  }
  async function getBalance(owner: string) {
    return token.connect(deployerWallet).balanceOf(owner)
  }
  async function setBid(maket: Market, bid: Bid, tokenId: number, spender?: string) {
    await maket.setBid(tokenId, bid, spender || bid.bidder, { gasLimit: 3500000 })
  }

  // beforeEach(async () => {
  //   await blockchain.resetAsync()
  // })

  describe('#constructor', () => {
    xit('should be able to deploy', async () => {
      await expect(deploy()).eventually.fulfilled
    })
  })

  describe('#configure', () => {
    beforeEach(async () => {
      await deploy()
    })

    it('should revert if not called by the owner', async () => {
      await expect(market.connect(otherWallet).configure(mediaAddress)).eventually.rejectedWith('Ownable: caller is not the owner')
    })

    it('should be callable by the owner', async () => {
      await expect(configure()).eventually.fulfilled
      const tokenContractAddress = await readMedia()

      expect(tokenContractAddress).eq(mediaAddress)
    })

    it('should be called twice', async () => {
      await configure()

      await expect(configure()).to.not.be.rejected
    })
  })

  describe('#setBidShares', () => {
    beforeEach(async () => {
      await deploy()
      await configure()
    })

    it('should reject if not called by the media address', async () => {
      const maket = await maketAs(otherWallet)

      await expect(setBidShares(maket, defaultTokenId, defaultBidShares)).rejectedWith('Market: Only media contract')
    })

    it('should set the bid shares if called by the media address', async () => {
      await configure()
      const maket = await maketAs(deployerWallet)

      await media.connect(deployerWallet).configure(mediaAddress, marketAddress)

      await media.connect(deployerWallet).mint(data, defaultBidShares)
      await media.connect(deployerWallet).mint(dataTwo, defaultBidShares)

      // await expect().to.be.fulfilled

      const tokenBidShares = Object.values(await maket.bidSharesForToken(defaultTokenId)).map((s: any) => parseInt(formatUnits(s.value, 'ether')))
      

      expect(tokenBidShares[0]).eq(toNumEther(defaultBidShares.prevOwner.value));
      expect(tokenBidShares[1]).eq(toNumEther(defaultBidShares.creator.value));
      expect(tokenBidShares[2]).eq(toNumEther(defaultBidShares.owner.value));
    })

    it('should reject if the bid shares are invalid', async () => {
      const maket = await maketAs(mockTokenWallet)
      const invalidBidShares = {
        prevOwner: Decimal.new(0),
        owner: Decimal.new(0),
        creator: Decimal.new(101),
      }

      let metadataHex = ethers.utils.formatBytes32String('{}')
      let metadataHash = await sha256(metadataHex)
      let metadataHashBytes = ethers.utils.arrayify(metadataHash)



      await media.connect(deployerWallet).configure(mediaAddress, marketAddress)

      // const tx = await media.connect(deployerWallet).mint(data, invalidBidShares)

      await expect(media.connect(deployerWallet).mint(data, invalidBidShares)).rejectedWith('Market: Invalid bid shares, must sum to 100')
    })
  })

  describe('#setAsk', () => {
    beforeEach(async () => {
      await deploy()
      await configure()
    })

    it('should reject if not called by the media address', async () => {
      const maket = await maketAs(otherWallet)

      await expect(setAsk(maket, defaultTokenId, defaultAsk)).rejectedWith('Market: Only media contract')
    })

    it('should set the ask if called by the media address', async () => {
      const maket = await maketAs(deployerWallet)
      // await setBidShares(maket, defaultTokenId, defaultBidShares)

      await media.connect(deployerWallet).configure(mediaAddress, marketAddress)
      await media.connect(deployerWallet).mint(data, defaultBidShares)
      await media.connect(deployerWallet).mint(dataTwo, defaultBidShares)

      const currentTokenId = await media._tokenIdTracker()

      await media.connect(deployerWallet).setAsk(defaultTokenId, defaultAsk)

      // await expect(media.connect(deployerWallet).setAsk(defaultTokenId, defaultAsk)).eventually.fulfilled

      const ask = await maket.currentAskForToken(defaultTokenId)

      expect(toNumWei(ask.amount)).to.eq(defaultAsk.amount)
      expect(ask.currency).to.eq(defaultAsk.currency)
    })


    it('should reject if the ask is too low', async () => {
      const maket = await maketAs(mockTokenWallet)
      // await setBidShares(maket, defaultTokenId, defaultBidShares)

      await media.connect(deployerWallet).configure(mediaAddress, marketAddress)
      await media.connect(deployerWallet).mint(data, defaultBidShares)
      await media.connect(deployerWallet).mint(dataTwo, defaultBidShares)

      await expect(
        media.connect(deployerWallet).setAsk(defaultTokenId, {
          amount: 1,
          currency: AddressZero,
          offline: false
        }),
      ).rejectedWith('Market: Ask invalid for share splitting')
    })

    it("should reject if the bid shares haven't been set yet", async () => {
      
      const invalidBidShares = {
        prevOwner: Decimal.new(0),
        owner: Decimal.new(0),
        creator: Decimal.new(101),
      }

      const maket = await maketAs(mockTokenWallet)
      await media.connect(deployerWallet).configure(mediaAddress, marketAddress)
      await expect(media.connect(deployerWallet).mint(data, invalidBidShares)).to.be.rejected
      await expect(media.connect(deployerWallet).mint(dataTwo, invalidBidShares)).to.be.rejected
      await expect(media.connect(deployerWallet).setAsk(1,defaultAsk)).to.be.rejected
    })
  })

  describe('#setBid', () => {
    let currency: string
    const defaultBid = {
      amount: 100,
      currency: token.address,
      bidder: bidderWallet.address,
      recipient: otherWallet.address,
      spender: bidderWallet.address,
      sellOnShare: Decimal.new(10),
      contract: null,
      offline: false,
    }

    beforeEach(async () => {
      await deploy()
      await configure()
      let { address, contract } = await deployCurrency()
      defaultBid.currency = address
      defaultBid.contract = contract
    })

    it('should revert if not called by the media contract', async () => {
      const maket = await maketAs(otherWallet)
      await expect(setBid(maket, defaultBid, defaultTokenId)).rejectedWith('Market: Only media contract')
    })

    it('should revert if the bidder does not have a high enough allowance for their bidding currency', async () => {
      const maket = await maketAs(mockTokenWallet)
      await media.connect(deployerWallet).configure(mediaAddress, marketAddress)
      await media.connect(deployerWallet).mint(data, defaultBidShares)
      await media.connect(deployerWallet).mint(dataTwo, defaultBidShares)

      await mintCurrency(defaultBid.bidder, 100000000)
      await expect(media.connect(bidderWallet).setBid(defaultTokenId, defaultBid)).to.be.reverted;

    })

    it('should revert if the bidder does not have enough tokens to bid with', async () => {
      const maket = await maketAs(mockTokenWallet)
      await media.connect(deployerWallet).configure(mediaAddress, marketAddress)
      await media.connect(deployerWallet).mint(data, defaultBidShares)
      await media.connect(deployerWallet).mint(dataTwo, defaultBidShares)

      await mintCurrency(defaultBid.bidder, defaultBid.amount - 1)
      await approveCurrency(marketAddress, bidderWallet)


      await expect(media.connect(bidderWallet).setBid(defaultTokenId, defaultBid)).to.be.reverted

    })

    it('should revert if the bid currency is 0 address', async () => {
      const maket = await maketAs(mockTokenWallet)
      await media.connect(deployerWallet).configure(mediaAddress, marketAddress)
      await media.connect(deployerWallet).mint(data, defaultBidShares)
      await media.connect(deployerWallet).mint(dataTwo, defaultBidShares)
      await mintCurrency(defaultBid.bidder, defaultBid.amount)
      await approveCurrency(marketAddress, bidderWallet)

      

      await expect(media.connect(bidderWallet).setBid(defaultTokenId, {
        ...defaultBid, currency: AddressZero,
        offline: false
      })).rejectedWith('Market: bid currency cannot be 0 address')
    })

    it('should revert if the bid recipient is 0 address', async () => {
      const maket = await maketAs(mockTokenWallet)
      await media.connect(deployerWallet).configure(mediaAddress, marketAddress)
      await media.connect(deployerWallet).mint(data, defaultBidShares)
      await media.connect(deployerWallet).mint(dataTwo, defaultBidShares)
      await mintCurrency(defaultBid.bidder, defaultBid.amount)
      await approveCurrency(marketAddress, bidderWallet)

    

      await expect(media.connect(bidderWallet).setBid(defaultTokenId, {
        ...defaultBid, recipient: AddressZero,
        offline: false
      })).rejectedWith('Market: bid recipient cannot be 0 address')
    })

    it('should revert if the bidder bids 0 tokens', async () => {
      const maket = await maketAs(mockTokenWallet)
      await media.connect(deployerWallet).configure(mediaAddress, marketAddress)
      await media.connect(deployerWallet).mint(data, defaultBidShares)
      await media.connect(deployerWallet).mint(dataTwo, defaultBidShares)
      await mintCurrency(defaultBid.bidder, defaultBid.amount)
      await approveCurrency(marketAddress, bidderWallet)

      await expect(media.connect(bidderWallet).setBid(defaultTokenId, {
        ...defaultBid, amount: 0,
        offline: false
      })).rejectedWith('Market: cannot bid amount of 0')
    })

    it('should accept a valid bid', async () => {
      const maket = await maketAs(mockTokenWallet)
      await media.connect(deployerWallet).configure(mediaAddress, marketAddress)
      await media.connect(deployerWallet).mint(data, defaultBidShares)
      await media.connect(deployerWallet).mint(dataTwo, defaultBidShares)
      await mintCurrency(defaultBid.bidder, defaultBid.amount)
      await approveCurrency(marketAddress, bidderWallet)
      const beforeBalance = toNumWei(await getBalance(defaultBid.bidder))

      await media.connect(bidderWallet).setBid(defaultTokenId, defaultBid)
      
      // await expect().fulfilled

      const afterBalance = toNumWei(await getBalance(defaultBid.bidder))
      const bid = await maket.bidForTokenBidder(1, bidderWallet.address)
      expect(bid.currency).eq(defaultBid.currency)
      expect(toNumWei(bid.amount)).eq(defaultBid.amount)
      expect(bid.bidder).eq(defaultBid.bidder)
      expect(beforeBalance).eq(afterBalance + defaultBid.amount)
    })

    it('should accept a valid bid larger than the min bid', async () => {
      const maket = await maketAs(mockTokenWallet)
      await media.connect(deployerWallet).configure(mediaAddress, marketAddress)
      await media.connect(deployerWallet).mint(data, defaultBidShares)
      await media.connect(deployerWallet).mint(dataTwo, defaultBidShares)
      await mintCurrency(defaultBid.bidder, defaultBid.amount)
      await approveCurrency(marketAddress, bidderWallet)

      const largerValidBid = {
        amount: 130000000,
        currency: defaultBid.currency,
        bidder: bidderWallet.address,
        recipient: otherWallet.address,
        spender: bidderWallet.address,
        sellOnShare: Decimal.new(10),
        offline: false
      }


      const beforeBalance = toNumWei(await getBalance(defaultBid.bidder))

      await media.connect(bidderWallet).setBid(defaultTokenId, defaultBid)

      // await expect(media.connect(bidderWallet).setBid(defaultTokenId, largerValidBid)).fulfilled

      const afterBalance = toNumWei(await getBalance(largerValidBid.bidder))
      const bid = await maket.bidForTokenBidder(1, bidderWallet.address)
      expect(bid.currency).eq(defaultBid.currency)
      expect(toNumWei(bid.amount)).eq(largerValidBid.amount)
      expect(bid.bidder).eq(largerValidBid.bidder)
      expect(beforeBalance).eq(afterBalance + largerValidBid.amount)
    })

    it('should refund the original bid if the bidder bids again', async () => {
      const maket = await maketAs(mockTokenWallet)
      await media.connect(deployerWallet).configure(mediaAddress, marketAddress)
      await media.connect(deployerWallet).mint(data, defaultBidShares)
      await media.connect(deployerWallet).mint(dataTwo, defaultBidShares)
      await mintCurrency(defaultBid.bidder, defaultBid.amount)
      await approveCurrency(marketAddress, bidderWallet)

      const bidderBalance = toNumWei(await token.connect(bidderWallet).balanceOf(bidderWallet.address))

      await media.connect(bidderWallet).setBid(defaultTokenId, defaultBid)
      
      await expect(media.connect(bidderWallet).setBid(defaultTokenId, {
        ...defaultBid, amount: defaultBid.amount * 2,
        offline: false
      })).fulfilled

      const afterBalance = toNumWei(await token.connect(bidderWallet).balanceOf(bidderWallet.address))
      await expect(afterBalance).eq(bidderBalance - defaultBid.amount * 2)
    })
  })
})
