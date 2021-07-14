require('dotenv').config()

import '@nomiclabs/hardhat-ethers'
import { HardhatUserConfig } from 'hardhat/types'

import 'hardhat-deploy'
import 'hardhat-typechain'
import '@nomiclabs/hardhat-ethers'

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { privateToAddress } from 'ethereumjs-util'
import fs from 'fs'


// export const OWNER_ADDRESS = process.env.CONTRACT_OWNER_ADDRESS ?? "0xf8f59f0269c4f6d7b5C5ab98d70180EAa0C7507E";
export const getWallet = async (hre: HardhatRuntimeEnvironment) => {
    let localDeployerMnemonic;
    localDeployerMnemonic = fs.readFileSync('./mnemonic.txt')
    localDeployerMnemonic = localDeployerMnemonic.toString().trim()

    let deployerWallet = hre.ethers.Wallet.fromMnemonic(
        localDeployerMnemonic as string
    );
    const privateKey = deployerWallet._signingKey().privateKey

    return deployerWallet
    // return hre.ethers.provider.getSigner()
}

export const getDeployerAddress = async (hre: HardhatRuntimeEnvironment) => {
    const deployer = await getWallet(hre);
    return await deployer.getAddress();
}