import { ethers } from 'hardhat'
import { Drop } from '../types/Drop'
import chai, { expect } from 'chai'
import { BigNumber, Bytes, BytesLike, utils } from 'ethers'

let drop: any
let signers: any
let mintAmt = 100000000
let owner

const TOKEN_URI = 'idx.zoolabs.io/token/'
const META_URI = 'idx.zoolabs.io/meta/'
const TOKEN_URI_BABY = 'idx.zoolabs.io/token/baby'
const META_URI_BABY = 'idx.zoolabs.io/meta/baby'
const TOKEN_URI_TEEN = 'idx.zoolabs.io/token/teen'
const META_URI_TEEN = 'idx.zoolabs.io/meta/teen'

describe('Drop', () => {
  beforeEach(async () => {
    signers = await ethers.getSigners()
    owner = signers[0]

    // Deploy drop
    const Drop = await ethers.getContractFactory('Drop', owner)
    drop = await Drop.deploy('Gen1')

    // Set default eggs on Drop
    const eggs = [
      {
        name: 'baseEgg',
        price: 210,
        supply: 16000,
        tokenURI: 'https://db.zoolabs/egg.jpg',
        metadataURI: 'https://db.zoolabs.org/egg.json',
      },
      {
        name: 'hybridEgg',
        price: 0,
        supply: 0,
        tokenURI: 'https://db.zoolabs/hybrid.jpg',
        metadataURI: 'https://db.zoolabs.org/hybrid.json',
      },
    ]

    await Promise.all(
      eggs.map((v) => {
        drop.setEgg(v.name, v.price, v.supply, v.tokenURI, v.metadataURI)
      }),
    )

    // configure our eggs to be base / hybrid egg
    drop.configureEggs(1, 2)

    // drop.setEgg(1)
    await drop.deployed()
  })

  // it('Should have current supply equal total supply', async () => {
  //   // await expect(drop.getEgg(1).minted.toNumber()).to.equal((await drop.totalSupply()).toNumber())
  //   console.log(await drop.getEgg(1).minted.toNumber(), (await drop.totalSupply()).toNumber())
  // })

  it('Should add Rarity', async () => {
    await drop.setRarity('RarityOne', 4, 10, 10)

    const rarity = await drop.rarities('RarityOne')

    expect(rarity.name).to.equal('RarityOne')
  })

  it('Should add Animal', async () => {
    await drop.setRarity('RarityOne', 4, 10, 10)
    await drop.setAnimal('Pug', 'RarityOne', TOKEN_URI, META_URI, TOKEN_URI_BABY, META_URI_BABY, TOKEN_URI_TEEN, META_URI_TEEN)

    const Animal = await drop.animals('Pug')

    expect(Animal.name).to.equal('Pug')
    expect(Animal.data.tokenURI).to.equal(TOKEN_URI_BABY)
  })

  it('Should add an Hybrid', async () => {
    await drop.setRarity('RarityOne', 4, 10, 10)
    await drop.setAnimal('PugMale', 'RarityOne', TOKEN_URI, META_URI, TOKEN_URI_BABY, META_URI_BABY, TOKEN_URI_TEEN, META_URI_TEEN)
    await drop.setAnimal('PugFemale', 'RarityOne', TOKEN_URI, META_URI, TOKEN_URI_BABY, META_URI_BABY, TOKEN_URI_TEEN, META_URI_TEEN)
    await drop.setHybrid('Puggy', 'RarityOne', 10, 'PugMale', 'PugFemale', TOKEN_URI, META_URI)

    const Hybrid = await drop.hybrids('Puggy')

    expect(Hybrid.name).to.equal('Puggy')
  })

  it('Should revert when adding a animal not as owner', async () => {
    drop = drop.connect(signers[1])
    await expect(drop.setAnimal('PugMale', 'RarityOne', TOKEN_URI, META_URI)).to.be.reverted
  })

  it('Should revert when adding a hybrid animal not as owner', async () => {
    drop = drop.connect(signers[1])
    await expect(drop.setHybrid('Puggy', 'RarityOne', 10, 'PugMale', 'PugFemale', TOKEN_URI, META_URI)).to.be.reverted
  })

  it('Should set & get egg price', async () => {
    drop = drop.connect(signers[0])
    const eggPrice = (await drop.eggPrice(1)).toString()
    expect(eggPrice).to.equal('210') // default eggPrice

    await drop.connect(signers[0]).setEggPrice(1, 333) //set a new price

    const newPrice = (await drop.eggPrice(1)).toString()
    
    expect(newPrice).to.equal('333') // gets the new eggPrice
  })

  it('Should revert when setting egg price as non owner', async () => {
    drop = drop.connect(signers[1])
    await expect(drop.setEggPrice(1, 333)).to.be.reverted
  })

  it('Should set tokenURI and metadatUri for Animal', async () => {
    drop = drop.connect(signers[0])
    await drop.setRarity('RarityOne', 4, 10, 10)
    await drop.setAnimal('Pug', 'RarityOne', TOKEN_URI, META_URI, TOKEN_URI_BABY, META_URI_BABY, TOKEN_URI_TEEN, META_URI_TEEN)
    await drop.setAnimalURIs('pug', 'newtokenuri.com', 'newmetadatauri.com', 'newtokenuriBaby.com', 'newmetadatauriBaby.com', 'newtokenuriTeen.com', 'newmetadatauriTeen.com')
    let URIs = await drop.animals('Pug')
    expect(URIs.data.tokenURI).to.equal('idx.zoolabs.io/token/baby')
    expect(URIs.data.metadataURI).to.equal('idx.zoolabs.io/meta/baby')
  })

  it('Should revert when setting tokenURI as non owner', async () => {
    drop = drop.connect(signers[1])
    await expect(drop.setAnimalURIs('pug', 'newtokenuri.com', 'newmetadatauri.com', 'newtokenuriBaby.com', 'newmetadatauriBaby.com', 'newtokenuriTeen.com', 'newmetadatauriTeen.com')).to.be.reverted
  })
})
