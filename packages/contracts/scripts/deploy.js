const hre = require("hardhat");
const ethers = hre.ethers

async function main() {
  const [signer] = await ethers.getSigners()

  // Deploy the token contract
  const ZooToken = await ethers.getContractFactory('ZooToken')
  const token = await ZooToken.deploy('ZooToken', 'ZOO', 18, 2000000000, signer.address)
  console.log('ZooToken', token.address)

  // // Transfer token ownership to farm contract
  // console.log('Transferring Token ownership')
  // await token.transferOwnership(farm.address)

  // // Deploy mock LP tokens for testing
  // const MockERC20 = await ethers.getContractFactory('MockERC20')
  // const lp  = await MockERC20.deploy('ZOO-BNB', 'LP', '10000000000')
  // console.log('BNB-ZOO LP address', lp.address)

  // // Add LP pools to farm contract
  // console.log('Adding BNB-ZOO LP to ZooToken')
  // await farm.add('100', lp.address, false)

  // // Transfer LP tokens and test deposit / withdrawal
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
