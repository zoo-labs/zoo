import { setupTestFactory, requireDependencies } from './utils'
import { ethers, waffle } from 'hardhat'
import { Contract, ContractFactory, Wallet } from 'ethers'
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
  const amountIn = 10 * 11
  const amountOut = 10 * 10


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
    bnbToken = B;
    oldZoo = Z;
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
    const tx = await txn.wait();
    const evt = tx.events[0];
    const addr = evt.args.pair;

    const amount = ethers.utils.parseEther('1000')
    await bnbToken.mint(sender.address, amount)
    await oldZoo.mint(sender.address, amount)

    await bnbToken.approve(router.address, amount)
    await oldZoo.approve(router.address, amount)

    await router.addLiquidity(
      bnbToken.address,
      oldZoo.address,
      amount,
      amount,
      0,
      0,
      sender.address,
      Date.now() * 60);

    await expect(savage.swap()).to.be.revertedWith("Err");
  })
})
