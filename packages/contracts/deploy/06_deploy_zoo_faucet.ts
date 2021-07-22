// deploy/06_deploy_zoo_faucet.ts
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { getDeployerAddress } from '../lib/deploy_helper'
import { ethers } from 'hardhat'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    const OWNER_ADDRESS = await getDeployerAddress(hre)

    let zooToken: any;

    const signers = await ethers.getSigners()

    const useProxy = !hre.network.live

    const tokenAddress = (await deployments.get('ZooToken')).address

    // Proxy only in non-live network (localhost and hardhat network) enabling
    // HCR (Hot Contract Replacement) in live network, proxy is disabled and
    // constructor is invoked
    await deploy('ZooFaucet', {
        from: OWNER_ADDRESS,
        args: [tokenAddress],
        log: true,
        // proxy: useProxy && 'postUpgrade',
    })

    // Gets the ZooToken interface
    const zooTokenFactory = await ethers.getContractFactory('ZooToken');

    // Attaches the deployed ZooToken address to this instance of zooToken
    zooToken = zooTokenFactory.attach(tokenAddress);

    // Gets the ZooFaucet interface
    const faucetFactory = await ethers.getContractFactory('ZooFaucet');

    // Gets the deployed ZooFaucet address
    const faucetAddress = (await deployments.get('ZooFaucet')).address;

    // Attaches the deployed ZooFaucet address to this instance of faucet
    const faucet = faucetFactory.attach(faucetAddress)

    // Mints 100 million ZOO and allocates it to ZooFaucet
    await zooToken.mint(faucet.address, 100000000);

    for (var i = 0; i < signers.length; i++) {

        // The 20 signer wallets get 10K ZOO on deployment
        await faucet.buyZoo(
            signers[i].address,
            10 // Rate: 1:1000 (10 * 1000) = 10000
        );
    }

    return !useProxy // When live network, record the script as executed to prevent rexecution


}

export default func
func.id = 'deploy_zoo_faucet' // ID required to prevent reexecution
func.tags = ['ZooFaucet']
func.dependencies = ['ZooToken']
