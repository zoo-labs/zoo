// @ts-ignore
import { ethers } from 'hardhat'
import chai, { expect } from 'chai'
import asPromised from 'chai-as-promised'
import { deployOtherNFTs, deployToken, deployProtocol, mint, ONE_ZOO, TENTH_ZOO, THOUSANDTH_ZOO, TWO_ZOO } from './utils'
import { Auction, Market, Media, ZOO, TestERC721 } from '../types'
import { BigNumber, Signer } from 'ethers'
import { MaxUint256 } from '@ethersproject/constants'
import { sha256 } from 'ethers/lib/utils'
import Decimal from '../utils/Decimal'

chai.use(asPromised)

const ONE_DAY = 24 * 60 * 60;

// helper function so we can parse numbers and do approximate number calculations, to avoid annoying gas calculations
const smallify = (bn: BigNumber) => bn.div(THOUSANDTH_ZOO).toNumber()

let mediaAddress: string
let marketAddress: string
let tokenAddress: string
let keeperAddress: string

let market
let media
let zookeeper




describe('integration', async () => {
  let token: ZOO
  let auction: Auction
  let otherNft: TestERC721
  let deployer, creator, owner, curator, bidderA, bidderB, otherUser: Signer
  let deployerAddress, ownerAddress, creatorAddress, curatorAddress, bidderAAddress, bidderBAddress, otherUserAddress: string

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

  let defaultBidShares = {
    prevOwner: Decimal.new(10),
    owner: Decimal.new(80),
    creator: Decimal.new(10),
  }

  async function deploy(): Promise<Auction> {
    const ZooAuction = await ethers.getContractFactory('Auction')
    const auctionHouse = await ZooAuction.deploy()
    await auctionHouse.configure(media.address, token.address)
    return auctionHouse as Auction
  }

  beforeEach(async () => {
    // await ethers.providers[0].send('hardhat_reset', [])
    ;[deployer, creator, owner, curator, bidderA, bidderB, otherUser] = await ethers.getSigners()
    ;[deployerAddress, creatorAddress, ownerAddress, curatorAddress, bidderAAddress, bidderBAddress, otherUserAddress] = await Promise.all(
      [deployer, creator, owner, curator, bidderA, bidderB].map((s) => s.getAddress()),
    )
    
    token = await deployToken()
    // const contracts = await deployProtocol(token.address)
    const nfts = await deployOtherNFTs()

    market = await (await (await ethers.getContractFactory('Market')).deploy()).deployed()
    marketAddress = market.address

    media = await (await (await ethers.getContractFactory('Media')).deploy('ZooAnimals', 'ANML')).deployed()
    mediaAddress = media.address

    zookeeper = await (await (await ethers.getContractFactory('ZooKeeper')).deploy()).deployed()
    keeperAddress = zookeeper.address

    await market.connect(deployer).configure(mediaAddress)
    await media.connect(deployer).configure(token.address, market.address)
    auction = await deploy()
    otherNft = nfts.test
    await market.connect(deployer).configure(media.address)
    await mint(media.connect(creator))
    await mint(media.connect(creator))
    await otherNft.mint(creator.address, 1)
    await media.connect(creator).transferFrom(creatorAddress, ownerAddress, 1)
    await otherNft.connect(creator).transferFrom(creatorAddress, ownerAddress, 1)
  })

  describe('Auction with no curator', async () => {
    async function run() {
      console.log('connect media')
      await media.connect(owner).approve(auction.address, 1)
      await token.connect(deployer).mint(bidderAAddress, ONE_ZOO)
      await token.connect(deployer).mint(bidderBAddress, TWO_ZOO)
      await token.connect(bidderA).approve(auction.address, ONE_ZOO)
      await token.connect(bidderB).approve(auction.address, TWO_ZOO)
      console.log('connect auction')
      await auction.connect(owner).createAuction(1, media.address, ONE_DAY, TENTH_ZOO, ethers.constants.AddressZero, 0, token.address)
      console.log('action currency', await auction.tokenAddress())
      // console.log('onwer of tokenId', await media.auctions(0).tokenOwner)
      // console.log('createbid auction', await auction._exists(1))
      await auction.connect(bidderA).createBid(1, ONE_ZOO, { value: ONE_ZOO })
      await auction.connect(bidderB).createBid(1, TWO_ZOO, { value: TWO_ZOO })
      await ethers.provider.send('evm_increaseTime', [ONE_DAY]);
      await ethers.provider.send('evm_mine', []);
      await auction.connect(otherUser).endAuction(1)
    }

    it('should transfer the NFT to the winning bidder', async () => {
      await run()
      expect(await media.ownerOf(1)).to.eq(bidderBAddress)
    })

    it('should withdraw the winning bid amount from the winning bidder', async () => {
      await run()
      const afterBalance = await token.balanceOf(bidderBAddress)

      expect(afterBalance).to.eq(ONE_ZOO.mul(0))
    })

    it('should refund the losing bidder', async () => {
      const beforeBalance = await token.balanceOf(bidderAAddress)
      await run()
      const afterBalance = await token.balanceOf(bidderAAddress)
      
      expect(afterBalance).to.eq(ONE_ZOO)
    })

    it('should pay the auction creator', async () => {
      const beforeBalance = await token.balanceOf(ownerAddress)
      await run()
      const afterBalance = await token.balanceOf(ownerAddress)

      expect(smallify(afterBalance)).to.be.approximately(
        // 20% curator fee  -> 2 ZOO * 80% = 1.6 ZOO
        smallify(beforeBalance.add(TENTH_ZOO.mul(20))),
        smallify(TENTH_ZOO),
      )
    })

  })

  describe('ZOO auction with curator', () => {
    async function run() {
      await media.connect(owner).approve(auction.address, 1)
      await auction.connect(owner).createAuction(1, media.address, ONE_DAY, TENTH_ZOO, curatorAddress, 20, token.address)
      await auction.connect(curator).setAuctionApproval(1, true)
      await token.connect(deployer).mint(bidderAAddress, ONE_ZOO)
      await token.connect(deployer).mint(bidderBAddress, TWO_ZOO)
      await token.connect(bidderA).approve(auction.address, ONE_ZOO)
      // await token.connect(bidderB).deposit({ value: TWO_ZOO });
      await token.connect(bidderB).approve(auction.address, TWO_ZOO)
      await auction.connect(bidderA).createBid(1, ONE_ZOO, { value: ONE_ZOO })
      await auction.connect(bidderB).createBid(1, TWO_ZOO, { value: TWO_ZOO })
      await ethers.provider.send('evm_increaseTime', [ONE_DAY]);
      await ethers.provider.send('evm_mine', []);
      await auction.connect(otherUser).endAuction(1)
    }

    it('should transfer the NFT to the winning bidder', async () => {
      await run()
      expect(await media.connect(owner).ownerOf(1)).to.eq(bidderBAddress)
    })

    it('should withdraw the winning bid amount from the winning bidder', async () => {
      await run()
      const afterBalance = await token.balanceOf(bidderBAddress)

      expect(afterBalance).to.eq(ONE_ZOO.mul(0))
    })

    it('should refund the losing bidder', async () => {
      const beforeBalance = await token.balanceOf(bidderAAddress)
      await run()
      const afterBalance = await token.balanceOf(bidderAAddress)

      expect(afterBalance).to.eq(ONE_ZOO)
    })

    it('should pay the auction creator', async () => {
      const beforeBalance = await token.balanceOf(ownerAddress)
      await run()
      const afterBalance = await token.balanceOf(ownerAddress)

      expect(smallify(afterBalance)).to.be.approximately(
        // 20% curator fee  -> 2 ZOO * 80% = 1.6 ZOO
        smallify(beforeBalance.add(TENTH_ZOO.mul(16))),
        smallify(TENTH_ZOO),
      )
    })
    it('should pay the curator', async () => {
      const beforeBalance = await token.balanceOf(curatorAddress)
      await run()
      const afterBalance = await token.balanceOf(curatorAddress)

      // 20% of 1.7 ZooToken -> 0.34
      expect(smallify(afterBalance)).to.be.approximately(smallify(beforeBalance.add(THOUSANDTH_ZOO.mul(340))), smallify(TENTH_ZOO))
    })
  })

  describe('ZooToken Auction with no curator', () => {
    async function run() {
      await media.connect(owner).approve(auction.address, 1)
      await auction.connect(owner).createAuction(1, media.address, ONE_DAY, TENTH_ZOO, ethers.constants.AddressZero, 20, token.address)
      // await token.connect(bidderA).deposit({ value: ONE_ZOO });
      await token.connect(bidderA).approve(auction.address, ONE_ZOO)
      await token.connect(deployer).mint(bidderAAddress, ONE_ZOO)
      await token.connect(deployer).mint(bidderBAddress, TWO_ZOO)
      // await token.connect(bidderB).deposit({ value: TWO_ZOO });
      await token.connect(bidderB).approve(auction.address, TWO_ZOO)
      await auction.connect(bidderA).createBid(1, ONE_ZOO, { value: ONE_ZOO })
      await auction.connect(bidderB).createBid(1, TWO_ZOO, { value: TWO_ZOO })
      await ethers.provider.send('evm_increaseTime', [ONE_DAY]);
      await ethers.provider.send('evm_mine', []);
      await auction.connect(otherUser).endAuction(1)
    }

    it('should transfer the NFT to the winning bidder', async () => {
      await run()
      expect(await media.ownerOf(1)).to.eq(bidderBAddress)
    })

    it('should withdraw the winning bid amount from the winning bidder', async () => {
      await run()
      const afterBalance = await token.balanceOf(bidderBAddress)

      expect(afterBalance).to.eq(ONE_ZOO.mul(0))
    })

    it('should refund the losing bidder', async () => {
      await run()
      const afterBalance = await token.balanceOf(bidderAAddress)

      expect(afterBalance).to.eq(ONE_ZOO)
    })

    it('should pay the auction creator', async () => {
      const beforeBalance = await token.balanceOf(ownerAddress)
      await run()
      const afterBalance = await token.balanceOf(ownerAddress)

      expect(smallify(afterBalance)).to.be.approximately(
        // 20% curator fee  -> 2 ZOO * 80% = 1.6 ZOO
        smallify(beforeBalance.add(TENTH_ZOO.mul(20))),
        smallify(TENTH_ZOO),
      )
    })

  })

  describe('ZooToken auction with curator', async () => {
    async function run() {
      await media.connect(owner).approve(auction.address, 1)
      await auction.connect(owner).createAuction(1, media.address, ONE_DAY, TENTH_ZOO, curator.address, 20, token.address)
      await auction.connect(curator).setAuctionApproval(1, true)
      // await token.connect(bidderA).deposit({ value: ONE_ZOO });
      await token.connect(deployer).mint(bidderAAddress, ONE_ZOO)
      await token.connect(deployer).mint(bidderBAddress, TWO_ZOO)
      await token.connect(bidderA).approve(auction.address, ONE_ZOO)
      // await token.connect(bidderB).deposit({ value: TWO_ZOO });
      await token.connect(bidderB).approve(auction.address, TWO_ZOO)
      await auction.connect(bidderA).createBid(1, ONE_ZOO, { value: ONE_ZOO })
      await auction.connect(bidderB).createBid(1, TWO_ZOO, { value: TWO_ZOO })
      await ethers.provider.send('evm_increaseTime', [ONE_DAY]);
      await ethers.provider.send('evm_mine', []);
      await auction.connect(otherUser).endAuction(1)
    }

    it('should transfer the NFT to the winning bidder', async () => {
      await run()
      expect(await media.ownerOf(1)).to.eq(bidderBAddress)
    })

    it('should withdraw the winning bid amount from the winning bidder', async () => {
      await run()
      const afterBalance = await token.balanceOf(bidderBAddress)

      expect(afterBalance).to.eq(ONE_ZOO.mul(0))
    })

    it('should refund the losing bidder', async () => {
      await run()
      const afterBalance = await token.balanceOf(bidderAAddress)

      expect(afterBalance).to.eq(ONE_ZOO)
    })

    it('should pay the auction creator', async () => {
      const beforeBalance = await token.balanceOf(ownerAddress)
      await run()
      const afterBalance = await token.balanceOf(ownerAddress)

      expect(smallify(afterBalance)).to.be.approximately(
        // 20% curator fee  -> 2 ZOO * 80% = 1.6 ZOO
        smallify(beforeBalance.add(TENTH_ZOO.mul(16))),
        smallify(TENTH_ZOO),
      )
    })
    it('should pay the auction curator', async () => {
      const beforeBalance = await token.balanceOf(curatorAddress)
      await run()
      const afterBalance = await token.balanceOf(curatorAddress)

      // 15% creator fee + 20% curator fee = 2 ZOO * 85% * 20% = 0.34 ZooToken
      expect(afterBalance).to.eq(beforeBalance.add(THOUSANDTH_ZOO.mul(400)))
    })
  })

  describe('3rd party nft auction', async () => {
    async function run() {
      await otherNft.connect(owner).approve(auction.address, 1)
      await auction.connect(owner).createAuction(1, otherNft.address, ONE_DAY, TENTH_ZOO, curatorAddress, 20, token.address)
      await auction.connect(curator).setAuctionApproval(1, true)
      await token.connect(deployer).mint(bidderAAddress, ONE_ZOO)
      await token.connect(deployer).mint(bidderBAddress, TWO_ZOO)
      await token.connect(bidderA).approve(auction.address, ONE_ZOO)
      // await token.connect(bidderB).deposit({ value: TWO_ZOO });
      await token.connect(bidderB).approve(auction.address, TWO_ZOO)
      await auction.connect(bidderA).createBid(1, ONE_ZOO, { value: ONE_ZOO })
      await auction.connect(bidderB).createBid(1, TWO_ZOO, { value: TWO_ZOO })
      await ethers.provider.send('evm_increaseTime', [ONE_DAY]);
      await ethers.provider.send('evm_mine', []);
      await auction.connect(otherUser).endAuction(1)
    }
    it('should transfer the NFT to the winning bidder', async () => {
      await run()
      expect(await otherNft.ownerOf(1)).to.eq(bidderBAddress)
    })

    it('should withdraw the winning bid amount from the winning bidder', async () => {
      await run()
      const afterBalance = await token.balanceOf(bidderBAddress)

      expect(afterBalance).to.eq(ONE_ZOO.mul(0))
    })

    it('should refund the losing bidder', async () => {
      const beforeBalance = await token.balanceOf(bidderAAddress)
      await run()
      const afterBalance = await token.balanceOf(bidderAAddress)

      expect(afterBalance).to.eq(ONE_ZOO)
    })

    it('should pay the auction creator', async () => {
      const beforeBalance = await token.balanceOf(ownerAddress)
      await run()
      const afterBalance = await token.balanceOf(ownerAddress)

      expect(smallify(afterBalance)).to.be.approximately(
        // 20% curator fee  -> 2 ZOO * 80% = 1.6 ZOO
        smallify(beforeBalance.add(TENTH_ZOO.mul(16))),
        smallify(TENTH_ZOO),
      )
    })

    it('should pay the curator', async () => {
      const beforeBalance = await token.balanceOf(curatorAddress)
      await run()
      const afterBalance = await token.balanceOf(curatorAddress)

      // 20% of 2 ZooToken -> 0.4
      expect(smallify(afterBalance)).to.be.approximately(smallify(beforeBalance.add(TENTH_ZOO.mul(4))), smallify(THOUSANDTH_ZOO))
    })
  })
})
