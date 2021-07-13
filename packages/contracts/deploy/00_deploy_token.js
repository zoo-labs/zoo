// deploy/00_deploy_token.js

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  console.log(deployer)

  await deploy('ZooToken', {
    from: deployer,
    args: ['ZooToken', 'ZOO', 18, 2000000000, deployer],
    log: true,
  })

  // Getting a previously deployed contract
  // const ZooToken = await ethers.getContract('ZooToken', deployer)
  // const contract = await ethers.getContractAt('ZooToken', '0x0')
}

module.exports.tags = ['ZooToken'];

// Tenderly verification
// let verification = await tenderly.verify({
//   name: contractName,
//   address: contractAddress,
//   network: targetNetwork,
// });
