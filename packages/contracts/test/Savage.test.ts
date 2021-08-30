import { setupTestFactory, requireDependencies } from './utils'
import { ethers, waffle } from 'hardhat'
import { Contract, BigNumber, ContractFactory, Wallet } from 'ethers'
import { Signer } from '@ethersproject/abstract-signer'
import { Savage as ISavage } from '../types'

import { IERC20 } from '../types'

const { expect } = requireDependencies()
const { deployContract, deployMockContract  } = waffle;

const setupTest = setupTestFactory(['UniswapV2Factory', 'UniswapV2Router02', 'Savage', 'Z', 'B'])

describe.only('Savage', function () {
  let savage: Contract
  let factory: Contract
  let router: Contract
  let oldZoo: Contract
  let bnbToken: Contract
  let Z: IERC20
  let erc20Token: Contract
  let signers: Signer[]
  let sender: any;
  const tril = ethers.utils.parseEther('1000000000000')

  beforeEach(async () => {
    const {
      signers: _signers,
      deployments,
      tokens: { UniswapV2Factory, UniswapV2Router02, Savage, Z, B }
    } = await setupTest()
    const _sender = _signers[0]
    signers = _signers
    sender = _sender
    factory = UniswapV2Factory;
    oldZoo = Z;
    bnbToken = B;
    router = UniswapV2Router02;
    savage = Savage
  })

  it('can be deployed', async () => {
    expect(savage).not.to.be.null
  })

  it('sets the factory correctly on router', async () => {
    const rfactory = await router.factory();
    expect(rfactory).to.equal(factory.address);
  })

  it('removes zoo from lp', async () => {
    const txn = await factory.createPair(oldZoo.address, bnbToken.address);
    await txn.wait();
    const pair = await factory.getPair(oldZoo.address, bnbToken.address);

    const amountZoo = ethers.utils.parseUnits('2180913677.035819786465972231', 18)
    const amountBNB = ethers.utils.parseUnits('2019.717141295805250967', 18)
    const amountIn = tril
    const amountOutMin = ethers.utils.parseUnits('1990', 18)

    const amountToSender = amountZoo.add(amountIn)

    await bnbToken.mint(sender.address, amountBNB)
    await oldZoo.mint(sender.address, amountToSender);

    await bnbToken.approve(router.address, amountBNB)
    await oldZoo.approve(router.address, amountZoo)

    expect(await oldZoo.balanceOf(sender.address)).to.be.equal(amountToSender);
    expect(await bnbToken.balanceOf(sender.address)).to.be.equal(amountBNB);

    expect(await oldZoo.balanceOf(pair)).to.be.equal(0);
    expect(await bnbToken.balanceOf(pair)).to.be.equal(0);

    // Add liquidity
    await router.addLiquidity(
      oldZoo.address,
      bnbToken.address,
      amountZoo, amountBNB,
      100, 100,
      sender.address,
      2e9
    )

    expect(await oldZoo.balanceOf(sender.address)).to.be.equal(tril);
    expect(await bnbToken.balanceOf(sender.address)).to.be.equal(0);
    expect(await bnbToken.balanceOf(router.address)).to.be.equal(0);

    expect(await oldZoo.balanceOf(pair)).to.be.equal(amountZoo);
    expect(await bnbToken.balanceOf(pair)).to.be.equal(amountBNB);

    await expect(savage.swapTokens(amountIn, amountOutMin)).to.not.be.reverted;
  })
})
