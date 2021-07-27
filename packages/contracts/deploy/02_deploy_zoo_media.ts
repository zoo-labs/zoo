// deploy/02_deploy_zoo_media.js
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const useProxy = !hre.network.live

  const marketAddress = (await deployments.get('ZooMarket')).address
  const tokenAddress = (await deployments.get("ZooToken")).address

  // Proxy only in non-live network (localhost and hardhat network) enabling
  // HCR (Hot Contract Replacement) in live network, proxy is disabled and
  // constructor is invoked
  await deploy('ZooMedia', {
    from: deployer,
    args: ['CryptoZoo', 'ANML', marketAddress, tokenAddress],
    log: true,
    // proxy: useProxy && 'postUpgrade',
  })

  return !useProxy // When live network, record the script as executed to prevent rexecution
}

export default func
func.id = 'deploy_zoo_media' // ID required to prevent reexecution
func.tags = ['ZooMedia']
func.dependencies = ['ZooMarket']; // this ensure the Token script above is executed first, so `deployments.get('Token')` succeeds
