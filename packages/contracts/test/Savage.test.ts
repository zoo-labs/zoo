import { setupTestFactory, requireDependencies } from './utils'
import { ethers, waffle } from 'hardhat'
import { Contract, BigNumber, ContractFactory, Wallet } from 'ethers'
import { Signer } from '@ethersproject/abstract-signer'
import { Savage as ISavage } from '../types'

import { IERC20 } from '../types'

const { expect } = requireDependencies()
const { deployContract, deployMockContract } = waffle

const setupTest = setupTestFactory(['UniswapV2Factory', 'UniswapV2Router02', 'Savage', 'Z1', 'BNB', 'ZOO'])

describe('Savage', function () {
  let savage: Contract
  let factory: Contract
  let router: Contract
  let zoo: Contract
  let bnb: Contract
  let z1: Contract
  let signers: Signer[]
  let sender: any

  const tril = ethers.utils.parseEther('1000000000000')
  const amountZoo = ethers.utils.parseUnits('2180913677.035819786465972231', 18)
  const amountBNB = ethers.utils.parseUnits('2019.717141295805250967', 18)
  const finalBNB = ethers.utils.parseUnits('2010', 18)
  const amountIn = tril
  const amountOutMin = ethers.utils.parseUnits('1990', 18)

  beforeEach(async () => {
    const {
      signers,
      deployments,
      tokens: { UniswapV2Factory, UniswapV2Router02, Savage, Z1, BNB, ZOO },
    } = await setupTest()
    sender = signers[0]
    factory = UniswapV2Factory
    router = UniswapV2Router02
    bnb = BNB
    savage = Savage
    z1 = Z1
    zoo = ZOO
  })

  it('can be deployed', async () => {
    expect(savage).not.to.be.null
  })

  it('sets the factory correctly on router', async () => {
    const rfactory = await router.factory()
    expect(rfactory).to.equal(factory.address)
  })

  it.only('check variables', async () => {
    console.log('zoo', zoo)
  })

  it('removes zoo from lp', async () => {
    const txn = await factory.createPair(zoo.address, bnb.address);
    await txn.wait();
    const pair = await factory.getPair(zoo.address, bnb.address)

    const amountToSender = amountZoo.add(amountIn)
    const originalBalance = await zoo.balanceOf(sender.address)

    await bnb.mint(sender.address, amountBNB)
    await zoo.mint(sender.address, amountToSender)

    await bnb.approve(router.address, amountBNB)
    await zoo.approve(router.address, amountZoo)

    await zoo.approve(savage.address, amountIn)
    await savage.drainPool()

    console.log(await bnb.balanceOf(sender.address))
    expect(await bnb.balanceOf(savage.address)).to.be.at.least(finalBNB)

    await savage.approvePool()
    await savage.launchPool()

    console.log(await bnb.balanceOf(sender.address))
    expect(await bnb.balanceOf(savage.address)).to.be.at.least(finalBNB)
  })
})
