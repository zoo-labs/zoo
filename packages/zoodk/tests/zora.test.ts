import {
  Ask,
  Bid,
  BidShares,
  constructAsk,
  constructBid,
  constructBidShares,
  constructMediaData,
  Decimal,
  EIP712Signature,
  generateMetadata,
  MediaData,
  sha256FromBuffer,
  signMintWithSigMessage,
  signPermitMessage,
  Zoo,
} from '../src'
import { JsonRpcProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'
import { addresses as ZooAddresses } from '../src/addresses'
import { deployCurrency, setupZoo, ZooConfiguredAddresses } from './helpers'
import { Blockchain, generatedWallets } from '@zoolabs/contracts/dist/utils'
import { BigNumber, Bytes } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { AddressZero } from '@ethersproject/constants'
import { MediaFactory } from '@zoolabs/contracts/dist/typechain'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { promises as fs } from 'fs'

let provider = new JsonRpcProvider()
let blockchain = new Blockchain(provider)
jest.setTimeout(1000000)

describe('Zoo', () => {
  describe('#constructor', () => {
    it('throws an error if a mediaAddress is specified but not a marketAddress', () => {
      const wallet = Wallet.createRandom()
      expect(function () {
        new Zoo(wallet, 4, '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401')
      }).toThrow(
        'Zoo Constructor: mediaAddress and marketAddress must both be non-null or both be null'
      )
    })

    it('throws an error if the marketAddress is specified but not a mediaAddress', () => {
      const wallet = Wallet.createRandom()
      expect(function () {
        new Zoo(wallet, 4, '', '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401')
      }).toThrow(
        'Zoo Constructor: mediaAddress and marketAddress must both be non-null or both be null'
      )
    })

    it('throws an error if one of the market or media addresses in not a valid ethereum address', () => {
      const wallet = Wallet.createRandom()
      expect(function () {
        new Zoo(
          wallet,
          4,
          'not a valid ethereum address',
          '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401'
        )
      }).toThrow('Invariant failed: not a valid ethereum address is not a valid address')

      expect(function () {
        new Zoo(
          wallet,
          4,
          '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401',
          'not a valid ethereum address'
        )
      }).toThrow('Invariant failed: not a valid ethereum address is not a valid address')
    })

    it('throws an error if the chainId does not map to a network with deployed instance of the Zoo Protocol', () => {
      const wallet = Wallet.createRandom()

      expect(function () {
        new Zoo(wallet, 50)
      }).toThrow(
        'Invariant failed: chainId 50 not officially supported by the Zoo Protocol'
      )
    })

    it('throws an error if the chainId does not map to a network with deployed instance of the Zoo Protocol', () => {
      const wallet = Wallet.createRandom()

      expect(function () {
        new Zoo(
          wallet,
          50,
          '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401',
          '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48'
        )
      }).not.toThrow(
        'Invariant failed: chainId 50 not officially supported by the Zoo Protocol'
      )
    })

    it('sets the Zoo instance to readOnly = false if a signer is specified', () => {
      const wallet = Wallet.createRandom()

      const zoo = new Zoo(
        wallet,
        50,
        '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401',
        '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48'
      )
      expect(zoo.readOnly).toBe(false)
    })

    it('sets the Zoo instance to readOnly = true if a signer is specified', () => {
      const provider = new JsonRpcProvider()

      const zoo = new Zoo(
        provider,
        50,
        '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401',
        '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48'
      )
      expect(zoo.readOnly).toBe(true)
    })

    it('initializes a Zoo instance with the checksummed media and market address for the specified chainId', () => {
      const wallet = Wallet.createRandom()
      const rinkebyMediaAddress = ZooAddresses['rinkeby'].media
      const rinkebyMarketAddress = ZooAddresses['rinkeby'].market
      const zoo = new Zoo(wallet, 4)
      expect(zoo.marketAddress).toBe(rinkebyMarketAddress)
      expect(zoo.mediaAddress).toBe(rinkebyMediaAddress)
      expect(zoo.market.address).toBe(rinkebyMarketAddress)
      expect(zoo.media.address).toBe(rinkebyMediaAddress)
    })

    it('initializes a Zoo instance with the specified media and market address if they are passed in', () => {
      const wallet = Wallet.createRandom()
      const mediaAddress = '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401'
      const marketAddress = '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48'

      const zoo = new Zoo(wallet, 50, mediaAddress, marketAddress)
      expect(zoo.readOnly).toBe(false)
      expect(zoo.marketAddress).toBe(marketAddress)
      expect(zoo.mediaAddress).toBe(mediaAddress)
      expect(zoo.market.address).toBe(marketAddress)
      expect(zoo.media.address).toBe(mediaAddress)

      const zoo1 = new Zoo(wallet, 50, mediaAddress, marketAddress)
      expect(zoo1.readOnly).toBe(false)
      expect(zoo1.marketAddress).toBe(marketAddress)
      expect(zoo1.mediaAddress).toBe(mediaAddress)
      expect(zoo1.market.address).toBe(marketAddress)
      expect(zoo1.media.address).toBe(mediaAddress)
    })
  })

  describe('contract functions', () => {
    let zooConfig: ZooConfiguredAddresses
    let provider = new JsonRpcProvider()
    let [mainWallet, otherWallet] = generatedWallets(provider)
    //let mainWallet = generatedWallets(provider)[0]

    beforeEach(async () => {
      await blockchain.resetAsync()
      zooConfig = await setupZoo(mainWallet, [otherWallet])
    })

    /******************
     * Write Functions
     ******************
     */

    describe('Write Functions', () => {
      let contentHash: string
      let contentHashBytes: Bytes
      let metadataHash: string
      let metadataHashBytes: Bytes
      let metadata: any
      let minifiedMetadata: string

      let defaultMediaData: MediaData
      let defaultBidShares: BidShares
      let defaultAsk: Ask
      let defaultBid: Bid
      let eipSig: EIP712Signature

      beforeEach(() => {
        metadata = {
          version: 'zoo-20210101',
          name: 'blah blah',
          description: 'blah blah blah',
          mimeType: 'text/plain',
        }
        minifiedMetadata = generateMetadata(metadata.version, metadata)
        metadataHash = sha256FromBuffer(Buffer.from(minifiedMetadata))
        contentHash = sha256FromBuffer(Buffer.from('invert'))

        defaultMediaData = constructMediaData(
          'https://example.com',
          'https://metadata.com',
          contentHash,
          metadataHash
        )
        defaultBidShares = constructBidShares(10, 90, 0)
        defaultAsk = constructAsk(zooConfig.currency, Decimal.new(100).value)
        defaultBid = constructBid(
          zooConfig.currency,
          Decimal.new(99).value,
          otherWallet.address,
          otherWallet.address,
          10
        )

        eipSig = {
          deadline: 1000,
          v: 0,
          r: '0x00',
          s: '0x00',
        }
      })

      describe('#updateContentURI', () => {
        it('throws an error if called on a readOnly Zoo instance', async () => {
          const provider = new JsonRpcProvider()

          const zoo = new Zoo(provider, 50, zooConfig.media, zooConfig.market)
          expect(zoo.readOnly).toBe(true)

          await expect(zoo.updateContentURI(0, 'new uri')).rejects.toBe(
            'ensureNotReadOnly: readOnly Zoo instance cannot call contract methods that require a signer.'
          )
        })

        it('throws an error if the tokenURI does not begin with `https://`', async () => {
          const zoo = new Zoo(otherWallet, 50, zooConfig.media, zooConfig.market)
          await zoo.mint(defaultMediaData, defaultBidShares)
          await expect(zoo.updateContentURI(0, 'http://example.com')).rejects.toBe(
            'Invariant failed: http://example.com must begin with `https://`'
          )
        })

        it('updates the content uri', async () => {
          const mainZoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          await mainZoo.mint(defaultMediaData, defaultBidShares)

          const tokenURI = await mainZoo.fetchContentURI(0)
          expect(tokenURI).toEqual(defaultMediaData.tokenURI)

          await mainZoo.updateContentURI(0, 'https://newURI.com')

          const newTokenURI = await mainZoo.fetchContentURI(0)
          expect(newTokenURI).toEqual('https://newURI.com')
        })
      })

      describe('#updateMetadataURI', () => {
        it('throws an error if called on a readOnly Zoo instance', async () => {
          const provider = new JsonRpcProvider()

          const zoo = new Zoo(provider, 50, zooConfig.media, zooConfig.market)
          expect(zoo.readOnly).toBe(true)

          await expect(zoo.updateMetadataURI(0, 'new uri')).rejects.toBe(
            'ensureNotReadOnly: readOnly Zoo instance cannot call contract methods that require a signer.'
          )
        })

        it('throws an error if the metadataURI does not begin with `https://`', async () => {
          const zoo = new Zoo(otherWallet, 50, zooConfig.media, zooConfig.market)
          await zoo.mint(defaultMediaData, defaultBidShares)
          await expect(zoo.updateMetadataURI(0, 'http://example.com')).rejects.toBe(
            'Invariant failed: http://example.com must begin with `https://`'
          )
        })

        it('updates the metadata uri', async () => {
          const mainZoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          await mainZoo.mint(defaultMediaData, defaultBidShares)

          const metadataURI = await mainZoo.fetchMetadataURI(0)
          expect(metadataURI).toEqual(defaultMediaData.metadataURI)

          await mainZoo.updateMetadataURI(0, 'https://newMetadataURI.com')

          const newMetadataURI = await mainZoo.fetchMetadataURI(0)
          expect(newMetadataURI).toEqual('https://newMetadataURI.com')
        })
      })

      describe('#mint', () => {
        it('throws an error if called on a readOnly Zoo instance', async () => {
          const provider = new JsonRpcProvider()

          const zoo = new Zoo(provider, 50, zooConfig.media, zooConfig.market)
          expect(zoo.readOnly).toBe(true)

          await expect(zoo.mint(defaultMediaData, defaultBidShares)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zoo instance cannot call contract methods that require a signer.'
          )
        })

        it('throws an error if bid shares do not sum to 100', async () => {
          const zoo = new Zoo(otherWallet, 50, zooConfig.media, zooConfig.market)
          const invalidBidShares = {
            prevOwner: Decimal.new(10),
            owner: Decimal.new(70),
            creator: Decimal.new(10),
          }
          expect(zoo.readOnly).toBe(false)

          await expect(zoo.mint(defaultMediaData, invalidBidShares)).rejects.toBe(
            'Invariant failed: The BidShares sum to 90000000000000000000, but they must sum to 100000000000000000000'
          )
        })

        it('throws an error if the tokenURI does not begin with `https://`', async () => {
          const zoo = new Zoo(otherWallet, 50, zooConfig.media, zooConfig.market)
          const invalidMediaData = {
            tokenURI: 'http://example.com',
            metadataURI: 'https://metadata.com',
            contentHash: contentHashBytes,
            metadataHash: metadataHashBytes,
          }
          expect(zoo.readOnly).toBe(false)

          await expect(zoo.mint(invalidMediaData, defaultBidShares)).rejects.toBe(
            'Invariant failed: http://example.com must begin with `https://`'
          )
        })

        it('throws an error if the metadataURI does not begin with `https://`', async () => {
          const zoo = new Zoo(otherWallet, 50, zooConfig.media, zooConfig.market)
          const invalidMediaData = {
            tokenURI: 'https://example.com',
            metadataURI: 'http://metadata.com',
            contentHash: contentHashBytes,
            metadataHash: metadataHashBytes,
          }
          expect(zoo.readOnly).toBe(false)

          await expect(zoo.mint(invalidMediaData, defaultBidShares)).rejects.toBe(
            'Invariant failed: http://metadata.com must begin with `https://`'
          )
        })

        it('pads the gas limit by 10%', async () => {
          const otherZooConfig = await setupZoo(otherWallet, [mainWallet])
          const zooMedia = MediaFactory.connect(zooConfig.media, mainWallet)
          const tx = await zooMedia.mint(defaultMediaData, defaultBidShares)
          const otherZoo = new Zoo(
            otherWallet,
            50,
            otherZooConfig.media,
            otherZooConfig.market
          )
          const paddedTx = await otherZoo.mint(defaultMediaData, defaultBidShares)

          expect(paddedTx.gasLimit).toEqual(tx.gasLimit.mul(110).div(100))
        })

        it('creates a new piece of media', async () => {
          const mainZoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          const totalSupply = await mainZoo.fetchTotalMedia()
          expect(totalSupply.toNumber()).toEqual(0)

          await mainZoo.mint(defaultMediaData, defaultBidShares)

          const owner = await mainZoo.fetchOwnerOf(0)
          const creator = await mainZoo.fetchCreator(0)
          const onChainContentHash = await mainZoo.fetchContentHash(0)
          const onChainMetadataHash = await mainZoo.fetchMetadataHash(0)

          const onChainBidShares = await mainZoo.fetchCurrentBidShares(0)
          const onChainContentURI = await mainZoo.fetchContentURI(0)
          const onChainMetadataURI = await mainZoo.fetchMetadataURI(0)

          expect(owner.toLowerCase()).toBe(mainWallet.address.toLowerCase())
          expect(creator.toLowerCase()).toBe(mainWallet.address.toLowerCase())
          expect(onChainContentHash).toBe(contentHash)
          expect(onChainContentURI).toBe(defaultMediaData.tokenURI)
          expect(onChainMetadataURI).toBe(defaultMediaData.metadataURI)
          expect(onChainMetadataHash).toBe(metadataHash)
          expect(onChainBidShares.creator.value).toEqual(defaultBidShares.creator.value)
          expect(onChainBidShares.owner.value).toEqual(defaultBidShares.owner.value)
          expect(onChainBidShares.prevOwner.value).toEqual(
            defaultBidShares.prevOwner.value
          )
        })
      })

      describe('#mintWithSig', () => {
        it('throws an error if called on a readOnly Zoo instance', async () => {
          const provider = new JsonRpcProvider()

          const zoo = new Zoo(provider, 50, zooConfig.media, zooConfig.market)
          expect(zoo.readOnly).toBe(true)

          await expect(
            zoo.mintWithSig(
              otherWallet.address,
              defaultMediaData,
              defaultBidShares,
              eipSig
            )
          ).rejects.toBe(
            'ensureNotReadOnly: readOnly Zoo instance cannot call contract methods that require a signer.'
          )
        })

        it('throws an error if bid shares do not sum to 100', async () => {
          const zoo = new Zoo(otherWallet, 50, zooConfig.media, zooConfig.market)
          const invalidBidShares = {
            prevOwner: Decimal.new(10),
            owner: Decimal.new(70),
            creator: Decimal.new(10),
          }
          expect(zoo.readOnly).toBe(false)

          await expect(
            zoo.mintWithSig(
              otherWallet.address,
              defaultMediaData,
              invalidBidShares,
              eipSig
            )
          ).rejects.toBe(
            'Invariant failed: The BidShares sum to 90000000000000000000, but they must sum to 100000000000000000000'
          )
        })

        it('throws an error if the tokenURI does not begin with `https://`', async () => {
          const zoo = new Zoo(otherWallet, 50, zooConfig.media, zooConfig.market)
          const invalidMediaData = {
            tokenURI: 'http://example.com',
            metadataURI: 'https://metadata.com',
            contentHash: contentHashBytes,
            metadataHash: metadataHashBytes,
          }
          expect(zoo.readOnly).toBe(false)

          await expect(
            zoo.mintWithSig(
              otherWallet.address,
              invalidMediaData,
              defaultBidShares,
              eipSig
            )
          ).rejects.toBe(
            'Invariant failed: http://example.com must begin with `https://`'
          )
        })

        it('throws an error if the metadataURI does not begin with `https://`', async () => {
          const zoo = new Zoo(otherWallet, 50, zooConfig.media, zooConfig.market)
          const invalidMediaData = {
            tokenURI: 'https://example.com',
            metadataURI: 'http://metadata.com',
            contentHash: contentHashBytes,
            metadataHash: metadataHashBytes,
          }
          expect(zoo.readOnly).toBe(false)

          await expect(zoo.mint(invalidMediaData, defaultBidShares)).rejects.toBe(
            'Invariant failed: http://metadata.com must begin with `https://`'
          )
        })

        it('creates a new piece of media', async () => {
          const otherZoo = new Zoo(otherWallet, 50, zooConfig.media, zooConfig.market)
          const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 // 24 hours
          const domain = otherZoo.eip712Domain()
          const nonce = await otherZoo.fetchMintWithSigNonce(mainWallet.address)
          const eipSig = await signMintWithSigMessage(
            mainWallet,
            contentHash,
            metadataHash,
            Decimal.new(10).value,
            nonce.toNumber(),
            deadline,
            domain
          )

          const totalSupply = await otherZoo.fetchTotalMedia()
          expect(totalSupply.toNumber()).toEqual(0)

          await otherZoo.mintWithSig(
            mainWallet.address,
            defaultMediaData,
            defaultBidShares,
            eipSig
          )

          const owner = await otherZoo.fetchOwnerOf(0)
          const creator = await otherZoo.fetchCreator(0)
          const onChainContentHash = await otherZoo.fetchContentHash(0)
          const onChainMetadataHash = await otherZoo.fetchMetadataHash(0)

          const onChainBidShares = await otherZoo.fetchCurrentBidShares(0)
          const onChainContentURI = await otherZoo.fetchContentURI(0)
          const onChainMetadataURI = await otherZoo.fetchMetadataURI(0)

          expect(owner.toLowerCase()).toBe(mainWallet.address.toLowerCase())
          expect(creator.toLowerCase()).toBe(mainWallet.address.toLowerCase())
          expect(onChainContentHash).toBe(contentHash)
          expect(onChainContentURI).toBe(defaultMediaData.tokenURI)
          expect(onChainMetadataURI).toBe(defaultMediaData.metadataURI)
          expect(onChainMetadataHash).toBe(metadataHash)
          expect(onChainBidShares.creator.value).toEqual(defaultBidShares.creator.value)
          expect(onChainBidShares.owner.value).toEqual(defaultBidShares.owner.value)
          expect(onChainBidShares.prevOwner.value).toEqual(
            defaultBidShares.prevOwner.value
          )
        })
      })

      describe('#setAsk', () => {
        it('throws an error if called on a readOnly Zoo instance', async () => {
          const provider = new JsonRpcProvider()

          const zoo = new Zoo(provider, 50, zooConfig.media, zooConfig.market)
          expect(zoo.readOnly).toBe(true)

          await expect(zoo.setAsk(0, defaultAsk)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zoo instance cannot call contract methods that require a signer.'
          )
        })

        it('sets an ask for a piece of media', async () => {
          const mainZoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          await mainZoo.mint(defaultMediaData, defaultBidShares)

          await mainZoo.setAsk(0, defaultAsk)

          const onChainAsk = await mainZoo.fetchCurrentAsk(0)
          expect(onChainAsk.currency.toLowerCase()).toEqual(
            defaultAsk.currency.toLowerCase()
          )
          expect(parseFloat(formatUnits(onChainAsk.amount, 'wei'))).toEqual(
            parseFloat(formatUnits(defaultAsk.amount, 'wei'))
          )
        })
      })

      describe('#setBid', () => {
        it('throws an error if called on a readOnly Zoo instance', async () => {
          const provider = new JsonRpcProvider()

          const zoo = new Zoo(provider, 50, zooConfig.media, zooConfig.market)
          expect(zoo.readOnly).toBe(true)

          await expect(zoo.setBid(0, defaultBid)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zoo instance cannot call contract methods that require a signer.'
          )
        })

        it('creates a new bid on chain', async () => {
          const mainZoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          await mainZoo.mint(defaultMediaData, defaultBidShares)

          const otherZoo = new Zoo(otherWallet, 50, zooConfig.media, zooConfig.market)
          const nullOnChainBid = await otherZoo.fetchCurrentBidForBidder(
            0,
            otherWallet.address
          )

          expect(nullOnChainBid.currency).toEqual(AddressZero)

          await otherZoo.setBid(0, defaultBid)
          const onChainBid = await otherZoo.fetchCurrentBidForBidder(
            0,
            otherWallet.address
          )

          expect(parseFloat(formatUnits(onChainBid.amount, 'wei'))).toEqual(
            parseFloat(formatUnits(onChainBid.amount, 'wei'))
          )
          expect(onChainBid.currency.toLowerCase()).toEqual(
            defaultBid.currency.toLowerCase()
          )
          expect(onChainBid.bidder.toLowerCase()).toEqual(defaultBid.bidder.toLowerCase())
          expect(onChainBid.recipient.toLowerCase()).toEqual(
            defaultBid.recipient.toLowerCase()
          )
          expect(onChainBid.sellOnShare.value).toEqual(defaultBid.sellOnShare.value)
        })
      })

      describe('#removeAsk', () => {
        it('throws an error if called on a readOnly Zoo instance', async () => {
          const provider = new JsonRpcProvider()

          const zoo = new Zoo(provider, 50, zooConfig.media, zooConfig.market)
          expect(zoo.readOnly).toBe(true)

          await expect(zoo.removeAsk(0)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zoo instance cannot call contract methods that require a signer.'
          )
        })

        it('removes an ask', async () => {
          const mainZoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          await mainZoo.mint(defaultMediaData, defaultBidShares)
          await mainZoo.setAsk(0, defaultAsk)

          const onChainAsk = await mainZoo.fetchCurrentAsk(0)
          expect(onChainAsk.currency.toLowerCase()).toEqual(
            defaultAsk.currency.toLowerCase()
          )

          await mainZoo.removeAsk(0)

          const nullOnChainAsk = await mainZoo.fetchCurrentAsk(0)
          expect(nullOnChainAsk.currency).toEqual(AddressZero)
        })
      })

      describe('#removeBid', () => {
        it('throws an error if called on a readOnly Zoo instance', async () => {
          const provider = new JsonRpcProvider()

          const zoo = new Zoo(provider, 50, zooConfig.media, zooConfig.market)
          expect(zoo.readOnly).toBe(true)

          await expect(zoo.removeBid(0)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zoo instance cannot call contract methods that require a signer.'
          )
        })

        it('removes a bid', async () => {
          const mainZoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          await mainZoo.mint(defaultMediaData, defaultBidShares)
          const otherZoo = new Zoo(otherWallet, 50, zooConfig.media, zooConfig.market)
          await otherZoo.setBid(0, defaultBid)
          const onChainBid = await otherZoo.fetchCurrentBidForBidder(
            0,
            otherWallet.address
          )

          expect(parseFloat(formatUnits(onChainBid.amount, 'wei'))).toEqual(
            parseFloat(formatUnits(onChainBid.amount, 'wei'))
          )
          expect(onChainBid.currency.toLowerCase()).toEqual(
            defaultBid.currency.toLowerCase()
          )
          expect(onChainBid.bidder.toLowerCase()).toEqual(defaultBid.bidder.toLowerCase())
          expect(onChainBid.recipient.toLowerCase()).toEqual(
            defaultBid.recipient.toLowerCase()
          )
          expect(onChainBid.sellOnShare.value).toEqual(defaultBid.sellOnShare.value)

          await otherZoo.removeBid(0)

          const nullOnChainBid = await otherZoo.fetchCurrentBidForBidder(
            0,
            otherWallet.address
          )

          expect(nullOnChainBid.currency).toEqual(AddressZero)
        })
      })

      describe('#acceptBid', () => {
        it('throws an error if called on a readOnly Zoo instance', async () => {
          const provider = new JsonRpcProvider()

          const zoo = new Zoo(provider, 50, zooConfig.media, zooConfig.market)
          expect(zoo.readOnly).toBe(true)

          await expect(zoo.acceptBid(0, defaultBid)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zoo instance cannot call contract methods that require a signer.'
          )
        })

        it('accepts a bid', async () => {
          const mainZoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          await mainZoo.mint(defaultMediaData, defaultBidShares)
          const otherZoo = new Zoo(otherWallet, 50, zooConfig.media, zooConfig.market)
          await otherZoo.setBid(0, defaultBid)
          await mainZoo.acceptBid(0, defaultBid)
          const newOwner = await otherZoo.fetchOwnerOf(0)
          expect(newOwner.toLowerCase()).toEqual(otherWallet.address.toLowerCase())
        })
      })

      describe('#permit', () => {
        it('throws an error if called on a readOnly Zoo instance', async () => {
          const provider = new JsonRpcProvider()

          const zoo = new Zoo(provider, 50, zooConfig.media, zooConfig.market)
          expect(zoo.readOnly).toBe(true)

          await expect(zoo.permit(otherWallet.address, 0, eipSig)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zoo instance cannot call contract methods that require a signer.'
          )
        })

        it('grants approval to a different address', async () => {
          const mainZoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          await mainZoo.mint(defaultMediaData, defaultBidShares)
          const otherZoo = new Zoo(otherWallet, 50, zooConfig.media, zooConfig.market)

          const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 // 24 hours
          const domain = mainZoo.eip712Domain()
          const eipSig = await signPermitMessage(
            mainWallet,
            otherWallet.address,
            0,
            0,
            deadline,
            domain
          )

          await otherZoo.permit(otherWallet.address, 0, eipSig)
          const approved = await otherZoo.fetchApproved(0)
          expect(approved.toLowerCase()).toBe(otherWallet.address.toLowerCase())
        })
      })

      describe('#revokeApproval', () => {
        it('throws an error if called on a readOnly Zoo instance', async () => {
          const provider = new JsonRpcProvider()

          const zoo = new Zoo(provider, 50, zooConfig.media, zooConfig.market)
          expect(zoo.readOnly).toBe(true)

          await expect(zoo.revokeApproval(0)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zoo instance cannot call contract methods that require a signer.'
          )
        })

        it("revokes an addresses approval of another address's media", async () => {
          const mainZoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          await mainZoo.mint(defaultMediaData, defaultBidShares)
          await mainZoo.approve(otherWallet.address, 0)
          const approved = await mainZoo.fetchApproved(0)
          expect(approved.toLowerCase()).toBe(otherWallet.address.toLowerCase())

          const otherZoo = new Zoo(otherWallet, 50, zooConfig.media, zooConfig.market)
          await otherZoo.revokeApproval(0)
          const nullApproved = await mainZoo.fetchApproved(0)
          expect(nullApproved).toBe(AddressZero)
        })
      })

      describe('#burn', () => {
        it('throws an error if called on a readOnly Zoo instance', async () => {
          const provider = new JsonRpcProvider()

          const zoo = new Zoo(provider, 50, zooConfig.media, zooConfig.market)
          expect(zoo.readOnly).toBe(true)

          await expect(zoo.burn(0)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zoo instance cannot call contract methods that require a signer.'
          )
        })

        it('burns a piece of media', async () => {
          const mainZoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          await mainZoo.mint(defaultMediaData, defaultBidShares)

          const owner = await mainZoo.fetchOwnerOf(0)
          expect(owner.toLowerCase()).toEqual(mainWallet.address.toLowerCase())

          const totalSupply = await mainZoo.fetchTotalMedia()
          expect(totalSupply.toNumber()).toEqual(1)

          await mainZoo.burn(0)

          const zeroSupply = await mainZoo.fetchTotalMedia()
          expect(zeroSupply.toNumber()).toEqual(0)
        })
      })

      describe('#approve', () => {
        it('throws an error if called on a readOnly Zoo instance', async () => {
          const provider = new JsonRpcProvider()

          const zoo = new Zoo(provider, 50, zooConfig.media, zooConfig.market)
          expect(zoo.readOnly).toBe(true)

          await expect(zoo.approve(otherWallet.address, 0)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zoo instance cannot call contract methods that require a signer.'
          )
        })

        it('grants approval for another address for a piece of media', async () => {
          const mainZoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          await mainZoo.mint(defaultMediaData, defaultBidShares)
          const nullApproved = await mainZoo.fetchApproved(0)
          expect(nullApproved).toBe(AddressZero)
          await mainZoo.approve(otherWallet.address, 0)
          const approved = await mainZoo.fetchApproved(0)
          expect(approved.toLowerCase()).toBe(otherWallet.address.toLowerCase())
        })
      })

      describe('#setApprovalForAll', () => {
        it('throws an error if called on a readOnly Zoo instance', async () => {
          const provider = new JsonRpcProvider()

          const zoo = new Zoo(provider, 50, zooConfig.media, zooConfig.market)
          expect(zoo.readOnly).toBe(true)

          await expect(zoo.setApprovalForAll(otherWallet.address, true)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zoo instance cannot call contract methods that require a signer.'
          )
        })

        it('sets approval for another address for all media owned by owner', async () => {
          const mainZoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          await mainZoo.mint(defaultMediaData, defaultBidShares)
          const notApproved = await mainZoo.fetchIsApprovedForAll(
            mainWallet.address,
            otherWallet.address
          )
          expect(notApproved).toBe(false)
          await mainZoo.setApprovalForAll(otherWallet.address, true)
          const approved = await mainZoo.fetchIsApprovedForAll(
            mainWallet.address,
            otherWallet.address
          )
          expect(approved).toBe(true)

          await mainZoo.setApprovalForAll(otherWallet.address, false)
          const revoked = await mainZoo.fetchIsApprovedForAll(
            mainWallet.address,
            otherWallet.address
          )
          expect(revoked).toBe(false)
        })
      })

      describe('#transferFrom', () => {
        it('throws an error if called on a readOnly Zoo instance', async () => {
          const provider = new JsonRpcProvider()

          const zoo = new Zoo(provider, 50, zooConfig.media, zooConfig.market)
          expect(zoo.readOnly).toBe(true)

          await expect(
            zoo.transferFrom(mainWallet.address, otherWallet.address, 0)
          ).rejects.toBe(
            'ensureNotReadOnly: readOnly Zoo instance cannot call contract methods that require a signer.'
          )
        })

        it('transfers media to another address', async () => {
          const mainZoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          await mainZoo.mint(defaultMediaData, defaultBidShares)
          const owner = await mainZoo.fetchOwnerOf(0)
          expect(owner.toLowerCase()).toEqual(mainWallet.address.toLowerCase())

          await mainZoo.transferFrom(mainWallet.address, otherWallet.address, 0)
          const newOwner = await mainZoo.fetchOwnerOf(0)
          expect(newOwner.toLowerCase()).toEqual(otherWallet.address.toLowerCase())
        })
      })

      describe('#safeTransferFrom', () => {
        it('throws an error if called on a readOnly Zoo instance', async () => {
          const provider = new JsonRpcProvider()

          const zoo = new Zoo(provider, 50, zooConfig.media, zooConfig.market)
          expect(zoo.readOnly).toBe(true)

          await expect(
            zoo.safeTransferFrom(mainWallet.address, otherWallet.address, 0)
          ).rejects.toBe(
            'ensureNotReadOnly: readOnly Zoo instance cannot call contract methods that require a signer.'
          )
        })
      })

      describe('#eip712Domain', () => {
        it('returns chainId 1 on a local blockchain', () => {
          const provider = new JsonRpcProvider()

          const zoo = new Zoo(provider, 50, zooConfig.media, zooConfig.market)
          const domain = zoo.eip712Domain()
          expect(domain.chainId).toEqual(1)
          expect(domain.verifyingContract.toLowerCase()).toEqual(
            zoo.mediaAddress.toLowerCase()
          )
        })

        it('returns the zoo chainId', () => {
          const provider = new JsonRpcProvider()
          const zoo = new Zoo(provider, 4, zooConfig.media, zooConfig.market)
          const domain = zoo.eip712Domain()

          expect(domain.chainId).toEqual(4)
          expect(domain.verifyingContract.toLowerCase()).toEqual(
            zoo.mediaAddress.toLowerCase()
          )
        })
      })

      describe('#isValidBid', () => {
        it('returns true if the bid amount can be evenly split by current bidShares', async () => {
          const zoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          await zoo.mint(defaultMediaData, defaultBidShares)
          const isValid = await zoo.isValidBid(0, defaultBid)
          expect(isValid).toEqual(true)
        })

        it('returns false if the bid amount cannot be evenly split by current bidShares', async () => {
          const cur = await deployCurrency(mainWallet, 'CUR', 'CUR', 2)
          const zoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          const bid = constructBid(
            cur,
            BigNumber.from(200),
            otherWallet.address,
            otherWallet.address,
            10
          )

          const preciseBidShares = {
            creator: Decimal.new(33.3333),
            owner: Decimal.new(33.3333),
            prevOwner: Decimal.new(33.3334),
          }

          await zoo.mint(defaultMediaData, preciseBidShares)
          const isValid = await zoo.isValidBid(0, bid)
          expect(isValid).toEqual(false)
        })

        it('returns false if the sell on share is invalid', async () => {
          const zoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          await zoo.mint(defaultMediaData, defaultBidShares)

          const bid = constructBid(
            zooConfig.currency,
            BigNumber.from(200),
            otherWallet.address,
            otherWallet.address,
            90.1
          )

          const isValid = await zoo.isValidBid(0, bid)
          expect(isValid).toEqual(false)
        })
      })

      describe('#isValidAsk', () => {
        it('returns true if the ask amount can be evenly split by current bidShares', async () => {
          const zoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          await zoo.mint(defaultMediaData, defaultBidShares)
          const isValid = await zoo.isValidAsk(0, defaultAsk)
          expect(isValid).toEqual(true)
        })

        it('returns false if the ask amount cannot be evenly split by current bidShares', async () => {
          const cur = await deployCurrency(mainWallet, 'CUR', 'CUR', 2)
          const zoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          const ask = constructAsk(cur, BigNumber.from(200))

          const preciseBidShares = {
            creator: Decimal.new(33.3333),
            owner: Decimal.new(33.3333),
            prevOwner: Decimal.new(33.3334),
          }

          await zoo.mint(defaultMediaData, preciseBidShares)
          const isValid = await zoo.isValidAsk(0, ask)
          expect(isValid).toEqual(false)
        })
      })

      describe('#isVerifiedMedia', () => {
        it('returns true if the media is verified', async () => {
          const zoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          const mock = new MockAdapter(axios)
          const helloWorldBuf = await fs.readFile('./fixtures/HelloWorld.txt')
          const helloWorldURI =
            'https://ipfs/io/ipfs/Qmf1rtki74jvYmGeqaaV51hzeiaa6DyWc98fzDiuPatzyy'
          const kanyeBuf = await fs.readFile('./fixtures/kanye.jpg')
          const kanyeURI =
            'https://ipfs.io/ipfs/QmRhK7o7gpjkkpubu9EvqDGJEgY1nQxSkP7XsMcaX7pZwV'

          mock.onGet(kanyeURI).reply(200, kanyeBuf)
          mock.onGet(helloWorldURI).reply(200, helloWorldBuf)

          const mediaData = constructMediaData(
            kanyeURI,
            helloWorldURI,
            sha256FromBuffer(kanyeBuf),
            sha256FromBuffer(helloWorldBuf)
          )
          await zoo.mint(mediaData, defaultBidShares)

          const verified = await zoo.isVerifiedMedia(0)
          expect(verified).toEqual(true)
        })

        it('returns false if the media is not verified', async () => {
          const zoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          const mock = new MockAdapter(axios)
          const helloWorldBuf = await fs.readFile('./fixtures/HelloWorld.txt')
          const helloWorldURI =
            'https://ipfs/io/ipfs/Qmf1rtki74jvYmGeqaaV51hzeiaa6DyWc98fzDiuPatzyy'
          const kanyeBuf = await fs.readFile('./fixtures/kanye.jpg')
          const kanyeURI =
            'https://ipfs.io/ipfs/QmRhK7o7gpjkkpubu9EvqDGJEgY1nQxSkP7XsMcaX7pZwV'

          mock.onGet(kanyeURI).reply(200, kanyeBuf)
          mock.onGet(helloWorldURI).reply(200, kanyeBuf) // this will cause verification to fail!

          const mediaData = constructMediaData(
            kanyeURI,
            helloWorldURI,
            sha256FromBuffer(kanyeBuf),
            sha256FromBuffer(helloWorldBuf)
          )
          await zoo.mint(mediaData, defaultBidShares)

          const verified = await zoo.isVerifiedMedia(0)
          expect(verified).toEqual(false)
        })

        it('rejects the promise if the media does not exist', async () => {
          const zoo = new Zoo(mainWallet, 50, zooConfig.media, zooConfig.market)
          await expect(zoo.isVerifiedMedia(0)).rejects.toContain(
            'token with that id does not exist'
          )
        })
      })
    })
  })
})
