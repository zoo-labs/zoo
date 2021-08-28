import { ethers, upgrades } from 'hardhat'

async function main() {
  // Deploy the upgradeable token contract
  const ZooToken = await ethers.getContractFactory('ZooTokenV2')
  const Token = await ethers.getContractFactory('FarmTokenV2')
  const token = await upgrades.deployProxy(Token)
  await token.deployed()
  console.log('ZooFarmTokenV2', token.address)

  // // Deploy the farm contract
  // const Farm = await ethers.getContractFactory('Farm')
  // const farm = await Farm.deploy(dao.address, 'DAO', token.address, 'TKN', '10', '0', '200000')
  // console.log('Farm', farm.address)

  // // Transfer token ownership to farm contract
  // console.log('Transferring Token ownership to Farm')
  // await token.transferOwnership(farm.address)

  // // Deploy mock LP tokens for testing
  // const MockERC20 = await ethers.getContractFactory('MockERC20')
  // const lp  = await MockERC20.deploy('ZOO-ETH', 'LP', '10000000000')
  // console.log('ZOO-ETH LP address', lp.address)

  // // Add LP pools to farm contract
  // console.log('Adding ZOO-ETH LP to Farm')
  // await farm.add('100', lp.address, false)

  // // Transfer LP tokens and test deposit / withdrawal
  // const [signer] = await ethers.getSigners()

  // console.log('Transfer tokens')
  // await lp.transfer(signer.address, '1000')

  // console.log('Approve LP token for transfer')
  // await lp.approve(farm.address, '1000')

  // console.log('Deposit LP tokens')
  // await farm.deposit(0, '100')

  // console.log('Withdraw LP tokens')
  // await farm.withdraw(0, '10')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
