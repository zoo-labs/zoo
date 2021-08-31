import { deployments, ethers } from 'hardhat'

async function main() {
  // Get current account
  const [signer] = await ethers.getSigners()

  const Factory = await deployments.get('UniswapV2Factory')
  const Router = await deployments.get('UniswapV2Router02')
  const Savage = await deployments.get('Savage')
  const ZOO = await deployments.get('Z')
  const BNB = await deployments.get('B')

  const tril = ethers.utils.parseEther('1000000000000')
  const txn = await Factory.createPair(ZOO.address, BNB.address);
  await txn.wait();

  const pair = await factory.getPair(ZOO.address, BNB.address);
  console.log('Pair', pair)

  const amountZoo = ethers.utils.parseUnits('2180913677.035819786465972231', 18)
  const amountBNB = ethers.utils.parseUnits('2019.717141295805250967', 18)

  await BNB.mint(signer.address, amountBNB)
  await ZOO.mint(signer.address, amountToSender);

  const finalBNB  = ethers.utils.parseUnits('2010', 18)
  const amountIn  = tril
  const amountOutMin = ethers.utils.parseUnits('1990', 18)

  const amountToSender = amountZoo.add(amountIn)

  await BNB.approve(router.address, amountBNB)
  await ZOO.approve(router.address, amountZoo)

  // Add liquidity
  await router.addLiquidity(
    ZOO.address,
    BNB.address,
    amountZoo, amountBNB,
    100, 100,
    sender.address,
    2e9
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
