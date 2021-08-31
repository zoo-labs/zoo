import { HardhatRuntimeEnvironment } from 'hardhat/types'

export type HRE = HardhatRuntimeEnvironment

export function Deploy(name: string, dependencies: string[], fn?: any) {
  const func = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, ethers, getChainId, getNamedAccounts } = hre
    const { deploy } = deployments
    const signers = await ethers.getSigners()

    // Fund all signers on hardnet network
    if (hre.network.name == 'hardhat') {
      await signers.map(async (s) => {
        await hre.network.provider.send('hardhat_setBalance', [
          s.address,
          "0x420000000000000000000",
        ])
      })
    }

    // Use deployer named account to deploy contract
    const { deployer } = await getNamedAccounts()

    async function deployContract(args: any[], libraries?: any) {
      const libs = {}

      if (libraries != null) {
        for (const name of libraries) {
          console.log('deploy', name)
          libs[name] = (await deploy(name, { from: deployer })).address
        }
      }

      return await deploy(name, {
        from: deployer,
        args: args,
        libraries: libs,
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
