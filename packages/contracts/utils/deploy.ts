import { HardhatRuntimeEnvironment } from 'hardhat/types'

export type HRE = HardhatRuntimeEnvironment

export function Deploy(name: string, dependencies: string[], fn?: any) {
  const func = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, ethers, getChainId, getNamedAccounts } = hre
    const { deploy } = deployments
    const signers = await ethers.getSigners()

    // Fund all signers
    await signers.map(async (s) => {
      await hre.network.provider.send('hardhat_setBalance', [
        s.address,
        "0x420000000000000000000",
      ])
    })

    // Use deployer named account to deploy contract
    const { deployer } = await getNamedAccounts()

    async function deployContract(args: any[]) {
      return await deploy(name, {
        from: deployer,
        args: args,
        log: true,
      })

    }

    const deps = {}
    for (const dep of dependencies) {
      deps[dep] = await deployments.get(dep)
    }

    await fn({ ethers: ethers, getChainId, getNamedAccounts: getNamedAccounts, hre: hre, deploy: deployContract, deployments: deployments, deps: deps })

    // When live network, record the script as executed to prevent rexecution
    // return !useProxy
  }

  func.id = [name]
  func.tags = [name]
  func.dependencies = dependencies
  return func
}

// Tenderly verification
// let verification = await tenderly.verify({
//   name: contractName,
//   address: contractAddress,
//   network: targetNetwork,
// })
