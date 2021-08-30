// @ts-ignore
import { ethers, deployments } from 'hardhat'
import { Token } from '../types'
import { sha256 } from 'ethers/lib/utils'
import Decimal from '../utils/Decimal'
import { BigNumber, BigNumberish, Contract } from 'ethers'
import { MaxUint256, AddressZero } from '@ethersproject/constants'
import { generatedWallets } from '../utils/generatedWallets'
import { JsonRpcProvider } from '@ethersproject/providers'
import { formatUnits } from '@ethersproject/units'
import { Wallet } from '@ethersproject/wallet'
import { recoverTypedMessage, recoverTypedSignature, signTypedData } from 'eth-sig-util'
import { bufferToHex, ecrecover, fromRpcSig, pubToAddress } from 'ethereumjs-util'
import { toUtf8Bytes } from 'ethers/lib/utils'
import { keccak256 } from '@ethersproject/keccak256'

let provider = new JsonRpcProvider()
let [deployerWallet] = generatedWallets(provider)

export const requireDependencies = () => {
  const chai = require('chai')
  const expect = chai.expect
  const asPromised = require('chai-as-promised')
  const { solidity } = require('ethereum-waffle')

  chai.use(asPromised)
  chai.use(solidity)

  return {
    chai,
    expect,
    asPromised,
    solidity,
  }
}

const deployContractsAsync = async (contractArr: string[]) => {
  return await contractArr.reduce(async (prev: Promise<{}>, name: string) => {
    const sum = await prev
    const contract: Contract = await ethers.getContract(name)
    sum[name] = contract;
    return sum;
  }, Promise.resolve({}))
}

export const setupTestFactory = (contractArr: string[]) =>
  deployments.createFixture(async ({ deployments, getNamedAccounts, ethers }, options) => {
    requireDependencies()
    await deployments.fixture(contractArr)

    let tokens: { [key: string]: Contract } = await deployContractsAsync(contractArr);
    // contractArr.reduce(async (sum: {}, name: string) => {
    //   const contract: Contract = await ethers.getContract(name)
    //   return {
    //     [name]: contract,
    //     ...sum,
    //   }
    // }, {})
    const signers = await ethers.getSigners()
    const owner = (await getNamedAccounts()).deployer
    return {
      owner: owner,
      signers: signers,
      tokens,
      deployments,
    }
  })

