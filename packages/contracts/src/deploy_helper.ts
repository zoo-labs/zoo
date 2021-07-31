require('dotenv').config()


import 'hardhat-deploy'
import 'hardhat-deploy-ethers'
import '@typechain/hardhat'

import { HardhatUserConfig, HardhatRuntimeEnvironment } from 'hardhat/types'
import { privateToAddress } from 'ethereumjs-util'
import fs from 'fs'


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
