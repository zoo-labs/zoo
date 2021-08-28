import { ethers, upgrades } from 'hardhat'

async function main() {
  // Deploy the upgradeable token contract
  const Token = await ethers.getContractFactory('ZooFarmTokenV2')
  const token = await upgrades.deployProxy(Token)
  await token.deployed()
  console.log('ZooFarmTokenV2', token.address)

  // Deploy the farm contract
  const ZooFarm = await ethers.getContractFactory('Farm')
  const farm = await Farm.deploy(dao.address, 'ZDAO', token.address, 'ZTKN', barn.address, '10', '0', '200000')
  console.log('Farm', farm.address)

  // Transfer token ownership to farm contract
  console.log('Transferring Token ownership to Farm')
  await token.transferOwnership(farm.address)

  // Deploy mock LP tokens for testing
  const MockERC20 = await ethers.getContractFactory('MockERC20')
  const lp  = await MockERC20.deploy('APE-ETH', 'LP', '10000000000')
  console.log('APE-ETH LP address', lp.address)

  // Add LP pools to farm contract
  console.log('Adding APE-ETH LP to ZooFarm')
  await farm.add('100', lp.address, false)

  // Transfer LP tokens and test deposit / withdrawal
  const [signer] = await ethers.getSigners()

  console.log('Transfer tokens')
  await lp.transfer(signer.address, '1000')

  console.log('Approve LP token for transfer')
  await lp.approve(farm.address, '1000')

  console.log('Deposit LP tokens')
  await farm.deposit(0, '100')

  console.log('Withdraw LP tokens')
  await farm.withdraw(0, '10')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
