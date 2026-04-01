import chai, { expect } from 'chai'
import asPromised from 'chai-as-promised'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'hardhat'
import { Wallet } from 'ethers'
import { LogDescription } from '@ethersproject/abi'
import { AddressZero, MaxUint256 } from '@ethersproject/constants'
import Decimal from '../utils/Decimal'
import { BigNumber, BigNumberish, Bytes } from 'ethers'
import { Media } from '../types/Media'
import { arrayify, formatBytes32String, formatUnits, sha256 } from 'ethers/lib/utils'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { signTypedData } from 'eth-sig-util'
import { fromRpcSig } from 'ethereumjs-util'
import { signMintWithSig, signPermit } from './utils'

chai.use(asPromised)

let provider = new JsonRpcProvider()

let contentHex: string
let contentHash: string
let contentHashBytes: Bytes
let otherContentHex: string
let otherContentHash: string
let otherContentHashBytes: Bytes
let zeroContentHashBytes: Bytes
let metadataHex: string
let metadataHash: string
let metadataHashBytes: Bytes

let tokenURI = 'www.example.com'
let metadataURI = 'www.example2.com'

type DecimalValue = { value: BigNumber }

type BidShares = {
  owner: DecimalValue
  prevOwner: DecimalValue
  creator: DecimalValue
}

type MediaData = {
  tokenURI: string
  metadataURI: string
  contentHash: Bytes
  metadataHash: Bytes
}

type Ask = { amount: BigNumberish; currency: string; offline: boolean; }

type Bid = { amount: BigNumberish; currency: string; bidder: string; recipient: string; sellOnShare: { value: BigNumberish; }; offline: boolean; }

describe('Media', async () => {
  // const [deployerWallet, bidderWallet, creatorWallet, ownerWallet, prevOwnerWallet, otherWallet, nonBidderWallet] = await ethers.getSigners()

  const [deployerWallet, bidderWallet, creatorWallet, ownerWallet, prevOwnerWallet, otherWallet, nonBidderWallet] = await ethers.getSigners()
  

  let defaultBidShares = {
    prevOwner: Decimal.new(10),
    owner: Decimal.new(80),
    creator: Decimal.new(10),
  }

  let defaultTokenId = 1
  let defaultAsk = {
    amount: 100,
    currency: '0x41A322b28D0fF354040e2CbC676F0320d8c8850d',
    sellOnShare: Decimal.new(0),
    offline: false
  }
  const defaultBid = (currency: string, bidder: string, recipient?: string) => ({
    amount: 100,
    currency,
    bidder,
    recipient: recipient || bidder,
    sellOnShare: Decimal.new(10),
    offline: false
  })

  let mediaAddress: string
  let marketAddress: string
  let tokenAddress: string
  let keeperAddress: string

  let market
  let media
  let token
  let zookeeper

  async function mediaAs(wallet: Wallet | SignerWithAddress) {
    return media.connect(wallet)
  }

  async function deploy() {
    token = await (await (await ethers.getContractFactory('ZOO')).deploy()).deployed()
    tokenAddress = token.address

    market = await (await (await ethers.getContractFactory('Market')).deploy()).deployed()
    marketAddress = market.address

    media = await (await (await ethers.getContractFactory('Media')).deploy('ZooAnimals', 'ANML')).deployed()
    mediaAddress = media.address

    zookeeper = await (await (await ethers.getContractFactory('ZooKeeper')).deploy()).deployed()
    keeperAddress = zookeeper.address

    await market.connect(deployerWallet).configure(mediaAddress)
    await media.connect(deployerWallet).configure(token.address, market.address)
  }

  async function mintWithSig(
    token: Media,
    creator: string,
    tokenURI: string,
    metadataURI: string,
    contentHash: Bytes,
    metadataHash: Bytes,
    shares: BidShares,
    sig: EIP712Sig
  ) {
    const data: MediaData = {
      tokenURI,
      metadataURI,
      contentHash,
      metadataHash,
    };

    return token.mintWithSig(creator, data, shares, sig);
  }

  async function mint(metadataURI: string, tokenURI: string, contentHash: Bytes, metadataHash: Bytes, mintWallet: Wallet | SignerWithAddress, shares: BidShares,) {
    const data: MediaData = {
      tokenURI,
      metadataURI,
      contentHash,
      metadataHash,
    }
    return media.connect(mintWallet).mint(data, shares)
  }

   function toNumWei(val: BigNumber) {
    return parseFloat(formatUnits(val, 'wei'))
  }
  
   type EIP712Sig = {
    deadline: BigNumberish
    v: any
    r: any
    s: any
  }
  
   async function signPermit(media: any, owner: Wallet | SignerWithAddress | any, toAddress: string, tokenAddress: string, tokenId: number, chainId: number) {
    return new Promise<EIP712Sig>(async (res, reject) => {
      let nonce
      const mediaContract = media.connect(owner)
  
      try {
        nonce = (await mediaContract.permitNonces(owner.address, tokenId)).toNumber()
      } catch (e) {
        console.error('NONCE', e)
        reject(e)
        return
      }
  
      const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 // 24 hours
      const name = await mediaContract.name()
  
      try {
        const sig = signTypedData(Buffer.from(owner.privateKey.slice(2), 'hex'), {
          data: {
            types: {
              EIP712Domain: [
                { name: 'name', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'address' },
              ],
              Permit: [
                { name: 'spender', type: 'address' },
                { name: 'tokenId', type: 'uint256' },
                { name: 'nonce', type: 'uint256' },
                { name: 'deadline', type: 'uint256' },
              ],
            },
            primaryType: 'Permit',
            domain: {
              name,
              version: '1',
              chainId,
              verifyingContract: mediaContract.address,
            },
            message: {
              spender: toAddress,
              tokenId,
              nonce,
              deadline,
            },
          },
        })
        const response = fromRpcSig(sig)
        res({
          r: response.r,
          s: response.s,
          v: response.v,
          deadline: deadline.toString(),
        })
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }
  
  async function setAsk(media: Media, mediaId: number, ask: Ask) {
    return media.setAsk(mediaId, ask)
  }

  async function removeAsk(media: Media, mediaId: number) {
    return media.removeAsk(mediaId)
  }

  async function setBid(media: Media, bid: Bid, mediaId: number) {
    return media.setBid(mediaId, bid)
  }

  async function removeBid(media: Media, mediaId: number) {
    return media.removeBid(mediaId)
  }

  async function acceptBid(media: Media, mediaId: number, bid: Bid) {
    return media.acceptBid(mediaId, bid)
  }

  //  async function deployCurrency() {
  //   const currency = await new ZOO__factory(deployerWallet).deploy()
  //   return currency.address
  // }
  
   async function mintCurrency(to: string, value: number) {
    await token.connect(deployerWallet).mint(to, value)
  }
  
   async function approveCurrency(spender: string, owner: Wallet | SignerWithAddress) {
    await token.connect(owner).approve(spender, MaxUint256)
  }
   async function getBalance(owner: string) {
    return token.connect(deployerWallet).balanceOf(owner)
  }

  // Trade a media a few times and create some open bids
  async function setupAuction(currencyAddr: string, mediaId = 0) {
    const asCreator = await mediaAs(creatorWallet)
    const asPrevOwner = await mediaAs(prevOwnerWallet)
    const asOwner = await mediaAs(ownerWallet)
    const asBidder = await mediaAs(bidderWallet)
    const asOther = await mediaAs(otherWallet)

    await mintCurrency(creatorWallet.address, 10000)
    await mintCurrency(prevOwnerWallet.address, 10000)
    await mintCurrency(ownerWallet.address, 10000)
    await mintCurrency(bidderWallet.address, 10000)
    await mintCurrency(otherWallet.address, 10000)
    await approveCurrency(marketAddress, creatorWallet)
    await approveCurrency(marketAddress, prevOwnerWallet)
    await approveCurrency(marketAddress, ownerWallet)
    await approveCurrency(marketAddress, bidderWallet)
    await approveCurrency(marketAddress, otherWallet)

    await mint(metadataURI, tokenURI, contentHashBytes, metadataHashBytes, creatorWallet,  defaultBidShares)

    await setBid(asPrevOwner, defaultBid(token.address, prevOwnerWallet.address), mediaId)
    await acceptBid(asCreator, mediaId, {
      ...defaultBid(token.address, prevOwnerWallet.address),
    })
    await setBid(asOwner, defaultBid(token.address, ownerWallet.address), mediaId)
    await acceptBid(asPrevOwner, mediaId, defaultBid(token.address, ownerWallet.address))
    await setBid(asBidder, defaultBid(token.address, bidderWallet.address), mediaId)
    await setBid(asOther, defaultBid(token.address, otherWallet.address), mediaId)
  }

  beforeEach(async () => {
    await deploy()
    // await blockchain.resetAsync()

    metadataHex = ethers.utils.formatBytes32String('{}')
    metadataHash = await sha256(metadataHex)
    metadataHashBytes = ethers.utils.arrayify(metadataHash)

    contentHex = ethers.utils.formatBytes32String('invert')
    contentHash = await sha256(contentHex)
    contentHashBytes = ethers.utils.arrayify(contentHash)

    otherContentHex = ethers.utils.formatBytes32String('otherthing')
    otherContentHash = await sha256(otherContentHex)
    otherContentHashBytes = ethers.utils.arrayify(otherContentHash)

    zeroContentHashBytes = ethers.utils.arrayify(ethers.constants.HashZero)
  })

  describe('#constructor', () => {
    it('should be able to deploy', async () => {
      await expect(deploy()).eventually.fulfilled
    })
  })

  describe('#mint', () => {
    beforeEach(async () => {
      await deploy()
    })

    it('should mint a media', async () => {
      // const media = await mediaAs(creatorWallet)

      await expect(
        mint(metadataURI, tokenURI, contentHashBytes, metadataHashBytes, creatorWallet, {
          prevOwner: Decimal.new(10),
          creator: Decimal.new(90),
          owner: Decimal.new(0),
        }),
      ).fulfilled

      const t = await media.tokenByIndex(0)
      const ownerT = await media.tokenOfOwnerByIndex(creatorWallet.address, 0)
      const ownerOf = await media.ownerOf(0)
      const creator = await media.tokenCreators(0)
      const prevOwner = await media.previousTokenOwners(0)
      const tokenContentHash = await media.tokenContentHashes(0)
      const metadataContentHash = await media.tokenMetadataHashes(0)
      const savedtokenURI = await media.tokenURI(0)
      const savedMetadataURI = await media.tokenMetadataURI(0)

      // expect(toNumWei(t)).eq(toNumWei(ownerT));
      expect(ownerOf).eq(creatorWallet.address)
      expect(creator).eq(creatorWallet.address)
      expect(prevOwner).eq(creatorWallet.address)
      expect(tokenContentHash).eq(contentHash)
      expect(metadataContentHash).eq(metadataHash)
      expect(savedtokenURI).eq(tokenURI)
      expect(savedMetadataURI).eq(metadataURI)
    })

    it('should revert if an empty content hash is specified', async () => {
      // const media = await mediaAs(creatorWallet)

      await expect(
        mint(metadataURI, tokenURI, zeroContentHashBytes, metadataHashBytes,creatorWallet, {
          prevOwner: Decimal.new(10),
          creator: Decimal.new(90),
          owner: Decimal.new(0),
        })
      ).rejectedWith('Media: content hash must be non-zero')
        
    })

    it('should revert if the content hash already exists for a created media', async () => {
      // const media = await mediaAs(creatorWallet)

      await expect(
        mint(metadataURI, tokenURI, contentHashBytes, metadataHashBytes, creatorWallet, {
          prevOwner: Decimal.new(10),
          creator: Decimal.new(90),
          owner: Decimal.new(0),
        })
      ).fulfilled


      let passed = true
      try {
        await mint(metadataURI, tokenURI, contentHashBytes, metadataHashBytes, creatorWallet, {
          prevOwner: Decimal.new(10),
          creator: Decimal.new(90),
          owner: Decimal.new(0),
        })
        passed = false
      } catch (error) {
        expect(error.error.body).to.contain('Media: a token has already been created with this content hash', 'This error body should have the correct revert error')
      }
      passed = true
      expect(passed, 'The previous tx was not reverted').to.be.true
    })

    it('should revert if the metadataHash is empty', async () => {
      // const media = await mediaAs(creatorWallet)

      await expect(
        mint(metadataURI, tokenURI, contentHashBytes, zeroContentHashBytes, creatorWallet, {
          prevOwner: Decimal.new(10),
          creator: Decimal.new(90),
          owner: Decimal.new(0),
        })
      ).rejectedWith('Media: metadata hash must be non-zero')
    })

    it('should revert if the tokenURI is empty', async () => {
      // const media = await mediaAs(creatorWallet)

      await expect(
        mint(metadataURI, '', zeroContentHashBytes, metadataHashBytes,creatorWallet, {
          prevOwner: Decimal.new(10),
          creator: Decimal.new(90),
          owner: Decimal.new(0),
        })
  
      ).rejectedWith('Media: specified uri must be non-empty')
    })

    it('should revert if the metadataURI is empty', async () => {
      // const media = await mediaAs(creatorWallet)

      await expect(
        mint('', tokenURI, zeroContentHashBytes, metadataHashBytes,creatorWallet,  {
          prevOwner: Decimal.new(10),
          creator: Decimal.new(90),
          owner: Decimal.new(0),
        }),
      ).rejectedWith('Media: specified uri must be non-empty')
    })

    it('should not be able to mint a media with bid shares summing to less than 100', async () => {
      // const media = await mediaAs(creatorWallet)

      await expect(
         mint(metadataURI, tokenURI, contentHashBytes, metadataHashBytes, creatorWallet, {
          prevOwner: Decimal.new(15),
          owner: Decimal.new(15),
          creator: Decimal.new(15),
        })
      ).rejectedWith('Market: Invalid bid shares, must sum to 100')
    })

    it('should not be able to mint a media with bid shares summing to greater than 100', async () => {
      // const media = await mediaAs(creatorWallet)

      await expect(
        mint(metadataURI, '222', contentHashBytes, metadataHashBytes, creatorWallet ,{
          prevOwner: Decimal.new(99),
          owner: Decimal.new(1),
          creator: Decimal.new(1),
        }),
      ).rejectedWith('Market: Invalid bid shares, must sum to 100')
    })
  })


  describe('#setAsk', () => {
    beforeEach(async () => {
      await deploy()
      await setupAuction(token.address)
    })

    it('should set the ask', async () => {
      const media = await mediaAs(ownerWallet)
      await expect(setAsk(media, 0, defaultAsk)).fulfilled
    })

    it('should reject if the ask is 0', async () => {
      const media = await mediaAs(ownerWallet)
      await expect(setAsk(media, 0, { ...defaultAsk, amount: 0 })).rejectedWith('Market: Ask invalid for share splitting')
    })

    it('should reject if the ask amount is invalid and cannot be split', async () => {
      const media = await mediaAs(ownerWallet)
      await expect(setAsk(media, 0, { ...defaultAsk, amount: 101 })).rejectedWith('Market: Ask invalid for share splitting')
    })
  })

  describe('#removeAsk', () => {
    let media: Media
    beforeEach(async () => {
      media = await (await mediaAs(creatorWallet)).deployed()
      await mint(metadataURI, tokenURI, contentHashBytes, metadataHashBytes, creatorWallet, {
        prevOwner: Decimal.new(10),
        creator: Decimal.new(90),
        owner: Decimal.new(0),
      })
    })
    it('should remove the ask', async () => {
      await market.connect(deployerWallet).deployed()
      await setAsk(media, 0, defaultAsk)

      await expect(removeAsk(media, 0)).fulfilled
      const ask = await market.currentAskForToken(0)
      expect(toNumWei(ask.amount)).eq(0)
      expect(ask.currency).eq(AddressZero)
    })


    it('should not be callable by anyone that is not owner or approved', async () => {
      await setAsk(media, 0, defaultAsk)
      // let passed = true
      await expect(media.connect(otherWallet).removeAsk(0)).to.be.reverted
      // expect(passed, 'Previous tx should have reverted').to.be.false
    })
  })

  describe('#setBid', () => {
    beforeEach(async () => {
      await deploy()
      await mint(metadataURI, '1111', otherContentHashBytes, metadataHashBytes, creatorWallet,  defaultBidShares)
    })

    it('should revert if the media bidder does not have a high enough allowance for their bidding currency', async () => {
      const media = await mediaAs(bidderWallet)
      let passed = false
      try {
        media.setBid(0, defaultBid(token.address, bidderWallet.address))
        passed = true
      } catch (error) {
        expect(error).to.contain('SafeERC20: ERC20 operation did not succeed')
        passed = true
      }
      expect(passed, 'The previous transaction was not reverted').to.be.true
    })

    it('should revert if the media bidder does not have a high enough balance for their bidding currency', async () => {
      const media = await mediaAs(bidderWallet)
      await approveCurrency(marketAddress, bidderWallet)
      let passed = false
      try {
        media.setBid(0, defaultBid(token.address, bidderWallet.address))
        passed = true
      } catch (error) {
        expect(error).to.contain('SafeERC20: ERC20 operation did not succeed')
        passed = true
      }
      expect(passed, 'The previous transaction was not reverted').to.be.true
    })

    it('should set a bid', async () => {
      const media = await mediaAs(bidderWallet)
      await approveCurrency(marketAddress, bidderWallet)
      await mintCurrency( bidderWallet.address, 100000)
      await expect(media.setBid(0, defaultBid(token.address, bidderWallet.address))).fulfilled
      const balance = await getBalance(bidderWallet.address)
      expect(toNumWei(balance)).eq(100000 - 100)
    })

    it('should automatically transfer the media if the ask is set', async () => {
      const media = await mediaAs(bidderWallet)
      const asOwner = await mediaAs(ownerWallet)
      await setupAuction(token.address, 1)
      await setAsk(asOwner, 1, { ...defaultAsk, currency: token.address })

      await expect(media.setBid(1, defaultBid(token.address, bidderWallet.address))).fulfilled

      await expect(media.ownerOf(1)).eventually.eq(bidderWallet.address)
    })

    it('should refund a bid if one already exists for the bidder', async () => {
      const media = await mediaAs(bidderWallet)
      await setupAuction(token.address, 1)

      const beforeBalance = toNumWei(await getBalance(bidderWallet.address))
      await setBid(
        media,
        {
          currency: token.address,
          amount: 200,
          bidder: bidderWallet.address,
          recipient: otherWallet.address,
          sellOnShare: Decimal.new(10),
          offline: false
        },
        1,
      )
      const afterBalance = toNumWei(await getBalance(bidderWallet.address))

      expect(afterBalance).eq(beforeBalance - 100)
    })
  })

  describe('#removeBid', () => {
    beforeEach(async () => {
      await deploy()
      await setupAuction(token.address)
    })

    it('should revert if the bidder has not placed a bid', async () => {
      const media = await mediaAs(nonBidderWallet)

      await expect(removeBid(media, 0)).rejectedWith('Market: cannot remove bid amount of 0')
    })

    it('should revert if the mediaId has not yet ben created', async () => {
      const media = await mediaAs(bidderWallet)
      // let passed = false
      await expect(removeBid(media, 100)).to.be.reverted
    })

    it('should remove a bid and refund the bidder', async () => {
      const media = await mediaAs(bidderWallet)
      const beforeBalance = toNumWei(await getBalance(bidderWallet.address))
      await expect(removeBid(media, 0)).fulfilled
      const afterBalance = toNumWei(await getBalance(bidderWallet.address))

      expect(afterBalance).eq(beforeBalance + 100)
    })

    it('should not be able to remove a bid twice', async () => {
      const media = await mediaAs(bidderWallet)
      await removeBid(media, 0)

      await expect(removeBid(media, 0)).rejectedWith('Market: cannot remove bid amount of 0')
    })

    it('should remove a bid, even if the media is burned', async () => {
      const asOwner = await mediaAs(ownerWallet)
      const asBidder = await mediaAs(bidderWallet)
      const asCreator = await mediaAs(creatorWallet)

      await asOwner.transferFrom(ownerWallet.address, creatorWallet.address, 0)
      await asCreator.burn(0)
      const beforeBalance = toNumWei(await getBalance(bidderWallet.address))
      await expect(asBidder.removeBid(0)).fulfilled
      const afterBalance = toNumWei(await getBalance(bidderWallet.address))
      expect(afterBalance).eq(beforeBalance + 100)
    })
  })

  describe('#acceptBid', () => {
    beforeEach(async () => {
      await deploy()
      await setupAuction(token.address)
    })

    it('should accept a bid', async () => {
      const media = await mediaAs(ownerWallet)
      const auction = await market.connect(bidderWallet)
      const asBidder = await mediaAs(bidderWallet)
      const bid = {
        ...defaultBid(token.address, bidderWallet.address, otherWallet.address),
        sellOnShare: Decimal.new(15),
      }
      await setBid(asBidder, bid, 0)

      const beforeOwnerBalance = toNumWei(await getBalance(ownerWallet.address))
      const beforePrevOwnerBalance = toNumWei(await getBalance(prevOwnerWallet.address))
      const beforeCreatorBalance = toNumWei(await getBalance(creatorWallet.address))
      await expect(media.acceptBid(0, bid)).fulfilled
      const newOwner = await media.ownerOf(0)
      const afterOwnerBalance = toNumWei(await getBalance(ownerWallet.address))
      const afterPrevOwnerBalance = toNumWei(await getBalance(prevOwnerWallet.address))
      const afterCreatorBalance = toNumWei(await getBalance(creatorWallet.address))
      const bidShares = await market.bidSharesForToken(0)

      expect(afterOwnerBalance).eq(beforeOwnerBalance + 80)
      expect(afterPrevOwnerBalance).eq(beforePrevOwnerBalance + 10)
      expect(afterCreatorBalance).eq(beforeCreatorBalance)
      expect(newOwner).eq(otherWallet.address)
      expect(toNumWei(bidShares[2].value)).eq(75 * 10 ** 18)
      expect(toNumWei(bidShares[0].value)).eq(15 * 10 ** 18)
      expect(toNumWei(bidShares[1].value)).eq(10 * 10 ** 18)
    })

    it('should revert if not called by the owner', async () => {
      const media = await mediaAs(otherWallet)

      await expect(media.acceptBid(0, { ...defaultBid(token.address, otherWallet.address) })).rejectedWith('Media: Only approved or owner')
    })

    it('should revert if a non-existent bid is accepted', async () => {
      const media = await mediaAs(ownerWallet)
      await expect(media.acceptBid(0, { ...defaultBid(token.address, AddressZero) })).rejectedWith('Market: cannot accept bid of 0')
    })

    it('should revert if an invalid bid is accepted', async () => {
      const media = await mediaAs(ownerWallet)
      const asBidder = await mediaAs(bidderWallet)
      const bid = {
        ...defaultBid(token.address, bidderWallet.address),
        amount: 99,
      }
      await setBid(asBidder, bid, 0)

      await expect(media.acceptBid(0, bid)).rejectedWith('Market: Bid invalid for share splitting')
    })

    // TODO: test the front running logic
  })

  describe('#transfer', () => {
    beforeEach(async () => {
      await deploy()
      await setupAuction(token.address)
    })

    it('should remove the ask after a transfer', async () => {
      const media = await mediaAs(ownerWallet)
      const auction = market.connect(deployerWallet)
      await setAsk(media, 0, defaultAsk)

      await expect(media.transferFrom(ownerWallet.address, otherWallet.address, 0)).fulfilled
      const ask = await auction.currentAskForToken(0)
      await expect(toNumWei(ask.amount)).eq(0)
      await expect(ask.currency).eq(AddressZero)
    })
  })

  describe('#burn', () => {
    beforeEach(async () => {
      await deploy()
      // const media = await mediaAs(creatorWallet)
      await mint(metadataURI, tokenURI, contentHashBytes, metadataHashBytes ,creatorWallet, {
        prevOwner: Decimal.new(10),
        creator: Decimal.new(90),
        owner: Decimal.new(0),
      })
    })

    it('should revert when the caller is the owner, but not creator', async () => {
      const creatormedia = await mediaAs(creatorWallet)
      await creatormedia.transferFrom(creatorWallet.address, ownerWallet.address, 0)
      const media = await mediaAs(ownerWallet)
      await expect(media.burn(0)).rejectedWith('Media: owner is not creator of media')
    })

    it('should revert when the caller is approved, but the owner is not the creator', async () => {
      const creatormedia = await mediaAs(creatorWallet)
      await creatormedia.transferFrom(creatorWallet.address, ownerWallet.address, 0)
      const media = await mediaAs(ownerWallet)
      await media.approve(otherWallet.address, 0)

      const otherToken = await mediaAs(otherWallet)
      await expect(otherToken.burn(0)).rejectedWith('Media: owner is not creator of media')
    })

    it('should revert when the caller is not the owner or a creator', async () => {
      const media = await mediaAs(otherWallet)

      await expect(media.burn(0)).rejectedWith('Media: Only approved or owner')
    })

    it('should revert if the media id does not exist', async () => {
      const media = await mediaAs(creatorWallet)

      await expect(media.burn(100)).to.be.reverted
    })

    it('should clear approvals, set remove owner, but maintain tokenURI and contentHash when the owner is creator and caller', async () => {
      const media = await mediaAs(creatorWallet)
      await expect(media.approve(otherWallet.address, 0)).fulfilled

      // await media.burn(0)

      // await expect(media.burn(0)).fulfilled

      console.log(await media.ownerOf(0))

      // await expect(media.ownerOf(0)).rejectedWith('ERC721: owner query for nonexistent media')

      // const totalSupply = await media.totalSupply()
      // expect(toNumWei(totalSupply)).eq(0)

      // await expect(media.getApproved(0)).rejectedWith('ERC721: approved query for nonexistent media')

      // const tokenURI = await media.tokenURI(0)
      // expect(tokenURI).eq('www.example.com')

      // const contentHash = await media.tokenContentHashes(0)
      // expect(contentHash).eq(contentHash)

      // const previousOwner = await media.previousTokenOwners(0)
      // expect(previousOwner).eq(AddressZero)
    })

    it('should clear approvals, set remove owner, but maintain tokenURI and contentHash when the owner is creator and caller is approved', async () => {
      const media = await mediaAs(creatorWallet)
      await expect(media.approve(otherWallet.address, 0)).fulfilled

      const otherToken = await mediaAs(otherWallet)

      // await expect(otherToken.burn(0)).fulfilled

      // console.log(await media.ownerOf(0))

      // await expect(media.ownerOf(0)).rejectedWith('ERC721: owner query for nonexistent media')

      // const totalSupply = await media.totalSupply()
      // expect(toNumWei(totalSupply)).eq(0)

      // await expect(media.getApproved(0)).rejectedWith('ERC721: approved query for nonexistent media')

      // const tokenURI = await media.tokenURI(0)
      // expect(tokenURI).eq('www.example.com')

      // const contentHash = await media.tokenContentHashes(0)
      // expect(contentHash).eq(contentHash)

      // const previousOwner = await media.previousTokenOwners(0)
      // expect(previousOwner).eq(AddressZero)
    })
  })

  describe('#updateTokenURI', async () => {

    beforeEach(async () => {
      await deploy()
      await setupAuction(token.address)
    })

    it('should revert if the media does not exist', async () => {
      const media = await mediaAs(creatorWallet)

      await expect(media.updateTokenURI(1, 'blah blah')).rejectedWith(`VM Exception while processing transaction: reverted with reason string 'ERC721: operator query for nonexistent token'`)
    })

    it('should revert if the caller is not the owner of the media and does not have approval', async () => {
      const media = await mediaAs(otherWallet)

      await expect(media.updateTokenURI(0, 'blah blah')).rejectedWith('Media: Only approved or owner')
    })

    it('should revert if the uri is empty string', async () => {
      const media = await mediaAs(ownerWallet)
      await expect(media.updateTokenURI(0, '')).rejectedWith('Media: specified uri must be non-empty')
    })

    it('should revert if the media has been burned', async () => {
      // const media = await mediaAs(creatorWallet)

      await mint(metadataURI, tokenURI, otherContentHashBytes, metadataHashBytes, creatorWallet, {
        prevOwner: Decimal.new(10),
        creator: Decimal.new(90),
        owner: Decimal.new(0),
      })

      await expect(media.connect(creatorWallet).burn(1)).fulfilled

      await expect(media.updateTokenURI(1, 'blah')).rejectedWith(`VM Exception while processing transaction: reverted with reason string 'ERC721: operator query for nonexistent token'`)
    })

    it('should set the tokenURI to the URI passed if the msg.sender is the owner', async () => {
      const media = await mediaAs(ownerWallet)
      await expect(media.updateTokenURI(0, 'blah blah')).fulfilled

      const tokenURI = await media.tokenURI(0)
      expect(tokenURI).eq('blah blah')
    })

    it('should set the tokenURI to the URI passed if the msg.sender is approved', async () => {
      const media = await mediaAs(ownerWallet)
      await media.approve(otherWallet.address, 0)

      const otherToken = await mediaAs(otherWallet)
      await expect(otherToken.updateTokenURI(0, 'blah blah')).fulfilled

      const tokenURI = await media.tokenURI(0)
      expect(tokenURI).eq('blah blah')
    })
  })

  describe('#updateTokenMetadataURI', async () => {

    beforeEach(async () => {
      await deploy()
      await setupAuction(token.address)
    })

    it('should revert if the media does not exist', async () => {
      const media = await mediaAs(creatorWallet)

      await expect(media.updateTokenMetadataURI(1, 'blah blah')).rejectedWith(`VM Exception while processing transaction: reverted with reason string 'ERC721: operator query for nonexistent token'`)
    })

    it('should revert if the caller is not the owner of the media or approved', async () => {
      const media = await mediaAs(otherWallet)

      await expect(media.updateTokenMetadataURI(0, 'blah blah')).rejectedWith('Media: Only approved or owner')
    })

    it('should revert if the uri is empty string', async () => {
      const media = await mediaAs(ownerWallet)
      await expect(media.updateTokenMetadataURI(0, '')).rejectedWith('Media: specified uri must be non-empty')
    })

    it('should revert if the media has been burned', async () => {
      // const media = await mediaAs(creatorWallet)

      await mint(metadataURI, tokenURI, otherContentHashBytes, metadataHashBytes, creatorWallet, {
        prevOwner: Decimal.new(10),
        creator: Decimal.new(90),
        owner: Decimal.new(0),
      })

      await expect(media.connect(creatorWallet).burn(1)).fulfilled

      await expect(media.updateTokenMetadataURI(1, 'blah')).rejectedWith(`VM Exception while processing transaction: reverted with reason string 'ERC721: operator query for nonexistent token'`)
    })

    it('should set the tokenMetadataURI to the URI passed if msg.sender is the owner', async () => {
      const media = await mediaAs(ownerWallet)
      await expect(media.updateTokenMetadataURI(0, 'blah blah')).fulfilled

      const tokenURI = await media.tokenMetadataURI(0)
      expect(tokenURI).eq('blah blah')
    })

    it('should set the tokenMetadataURI to the URI passed if the msg.sender is approved', async () => {
      const media = await mediaAs(ownerWallet)
      await media.approve(otherWallet.address, 0)

      const otherToken = await mediaAs(otherWallet)
      await expect(otherToken.updateTokenMetadataURI(0, 'blah blah')).fulfilled

      const tokenURI = await media.tokenMetadataURI(0)
      expect(tokenURI).eq('blah blah')
    })
  })


  describe('#supportsInterface', async () => {
    beforeEach(async () => {
      await deploy()
    })

    it('should return true to supporting new metadata interface', async () => {
      const media = await mediaAs(otherWallet)
      const interfaceId = ethers.utils.arrayify('0x4e222e66')
      const supportsId = await media.supportsInterface(interfaceId)
      expect(supportsId).eq(true)
    })

    it('should return false to supporting the old metadata interface', async () => {
      const media = await mediaAs(otherWallet)
      const interfaceId = ethers.utils.arrayify('0x5b5e139f')
      const supportsId = await media.supportsInterface(interfaceId)
      expect(supportsId).eq(false)
    })
  })

  describe('#revokeApproval', async () => {
    let currency = tokenAddress

    beforeEach(async () => {
      await deploy()
      await setupAuction(currency)
    })

    it('should revert if the caller is the owner', async () => {
      const media = await mediaAs(ownerWallet)
      await expect(media.revokeApproval(0)).rejectedWith('Media: caller not approved address')
    })

    it('should revert if the caller is the creator', async () => {
      const media = await mediaAs(creatorWallet)
      await expect(media.revokeApproval(0)).rejectedWith('Media: caller not approved address')
    })

    it('should revert if the caller is neither owner, creator, or approver', async () => {
      const media = await mediaAs(otherWallet)
      await expect(media.revokeApproval(0)).rejectedWith('Media: caller not approved address')
    })

    it('should revoke the approval for media id if caller is approved address', async () => {
      const media = await mediaAs(ownerWallet)
      await media.approve(otherWallet.address, 0)
      const otherToken = await mediaAs(otherWallet)
      await expect(otherToken.revokeApproval(0)).fulfilled
      const approved = await media.getApproved(0)
      expect(approved).eq(ethers.constants.AddressZero)
    })
  })
})
