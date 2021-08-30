import { setupTestFactory, requireDependencies } from './utils'
import { ethers, waffle } from 'hardhat'
import { Contract, ContractFactory, Wallet } from 'ethers'
import { Signer } from '@ethersproject/abstract-signer'
import { Savage as ISavage, Token as IToken } from '../types'

import { IERC20Uniswap, IUniswapV2Router02, IUniswapV2ERC20, IUniswapV2Factory } from '../types'

import Savage from '../artifacts/src/Savage.sol/Savage.json';
import Token from '../artifacts/src/Token.sol/Token.json'
import UniswapV2ERC20 from '../artifacts/src/uniswapv2/UniswapV2ERC20.sol/UniswapV2ERC20.json'
import UniswapV2Factory from '../artifacts/src/uniswapv2/UniswapV2Factory.sol/UniswapV2Factory.json'
import UniswapV2Router02 from '../artifacts/src/uniswapv2/UniswapV2Router02.sol/UniswapV2Router02.json'

const { expect } = requireDependencies()
const { deployContract, deployMockContract  } = waffle;

const setupTest = setupTestFactory([])

describe.only('Savage', function () {
  let savage: Contract
  let factory: Contract
  let router: Contract
  let oldZoo: Contract
  let bnbToken: Contract
  let Z: IERC20Uniswap
  let erc20Token: Contract
  let signers: Signer[]
  let WETH = 10 ** 18
  const amountIn = 10 * 11
  const amountOut = 10 * 10


  beforeEach(async () => {
    const {
      signers: _signers,
      deployments
    } = await setupTest()
    const sender = _signers[0]
    erc20Token = await deployMockContract(sender, UniswapV2ERC20.abi)
    factory = await deployMockContract(sender, UniswapV2Factory.abi)
    router = await deployMockContract(sender, UniswapV2Router02.abi)

    oldZoo = await deployMockContract(sender, UniswapV2ERC20.abi)

    oldZoo = await deployMockContract(sender, Token.abi)
    bnbToken = await deployMockContract(sender, Token.abi)
    signers = _signers

    const cont = { abi: Savage.abi, bytecode: Savage.bytecode }

    savage = await deployContract(sender, cont, [bnbToken, oldZoo, factory, router, amountIn, amountOut])
  })

  it('can be deployed', async () => {
    expect(savage).not.to.be.null
  })
})
