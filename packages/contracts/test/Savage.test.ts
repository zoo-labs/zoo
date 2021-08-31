import { setupTestFactory, requireDependencies } from './utils'
import { ethers, waffle } from 'hardhat'
import { Contract, BigNumber, ContractFactory, Wallet } from 'ethers'
import { Signer } from '@ethersproject/abstract-signer'
import { Savage as ISavage } from '../types'

import { IERC20 } from '../types'

const { expect } = requireDependencies()
const { deployContract, deployMockContract } = waffle

const setupTest = setupTestFactory(['UniswapV2Factory', 'UniswapV2Router02', 'Savage', 'Z', 'B'])

describe.only('Savage', function () {
  let savage: Contract
  let factory: Contract
  let router: Contract
  let ZOO: Contract
  let BNB: Contract
  let Z: IERC20
  let erc20Token: Contract
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
      signers: _signers,
      deployments,
      tokens: { UniswapV2Factory, UniswapV2Router02, Savage, Z, B },
    } = await setupTest()
    const _sender = _signers[0]
    signers = _signers
    sender = _sender
    factory = UniswapV2Factory
    ZOO = Z
    BNB = B
    router = UniswapV2Router02
    savage = Savage
  })

  it('can be deployed', async () => {
    expect(savage).not.to.be.null
  })

  it('sets the factory correctly on router', async () => {
    const rfactory = await router.factory()
    expect(rfactory).to.equal(factory.address)
  })

  it('removes zoo from lp', async () => {
    // const txn = await factory.createPair(ZOO.address, BNB.address);
    // await txn.wait();
    const pair = await factory.getPair(ZOO.address, BNB.address)

    const amountToSender = amountZoo.add(amountIn)

    const originalBalance = await ZOO.balanceOf(sender.address)

    await BNB.mint(sender.address, amountBNB)
    await ZOO.mint(sender.address, amountToSender)

    await BNB.approve(router.address, amountBNB)
    await ZOO.approve(router.address, amountZoo)
  })

  // expect(await ZOO.balanceOf(sender.address)).to.be.equal(amountToSender.add(originalBalance));
  // expect(await BNB.balanceOf(sender.address)).to.be.equal(amountBNB);

  // expect(await ZOO.balanceOf(pair)).to.be.equal(0);
  // expect(await BNB.balanceOf(pair)).to.be.equal(0);

  // // Add liquidity
  // await router.addLiquidity(
  //   ZOO.address,
  //   BNB.address,
  //   amountZoo, amountBNB,
  //   100, 100,
  //   sender.address,
  //   2e9
  // )

  // expect(await ZOO.balanceOf(sender.address)).to.be.equal(tril);
  // expect(await BNB.balanceOf(sender.address)).to.be.equal(0);
  // expect(await BNB.balanceOf(router.address)).to.be.equal(0);

  it('drains zoo with drainPool', async () => {
    const pair = await factory.getPair(ZOO.address, BNB.address)
    expect(await ZOO.balanceOf(pair)).to.be.equal(amountZoo)
    expect(await BNB.balanceOf(pair)).to.be.equal(amountBNB)

    await ZOO.approve(savage.address, amountIn)
    await savage.drainPool()
    // await savage.swapTokens(amountIn, amountOutMin)
    // expect(await savage.swapTokens(amountIn, amountOutMin)).to.not.be.reverted;

    console.log(await BNB.balanceOf(sender.address))
    expect(await BNB.balanceOf(savage.address)).to.be.at.least(finalBNB)
  })
})
