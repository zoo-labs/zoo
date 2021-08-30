// deploy/04_v2router02.ts
// import { WNATIVE } from "@sushiswap/sdk"

// export default async function ({ getChainId, getNamedAccounts, deployments }) {
//   const { deploy } = deployments;

//   const { deployer } = await getNamedAccounts();


//   await deploy("UniswapV2Router02", {
//     from: deployer,
//     args: [factoryAddress, wethAddress],
//     log: true,
//     deterministicDeployment: false,
//   });
// };

// module.exports.tags = ["UniswapV2Router02", "AMM"];
// module.exports.dependencies = ["UniswapV2Factory", "WETH"];

import { Deploy } from '@zoolabs/contracts/utils/deploy'

export default Deploy('UniswapV2Router02', ['WETH', 'UniswapV2Factory'], async({ getChainId, hre, deploy, deployments, deps }) => {
  const { WETH, UniswapV2Factory } = deps
  const chainId = await getChainId()

  // let wethAddress

  // if (chainId === "1337") {
  //   wethAddress = (await deployments.get("WETH")).address;
  // } else if (chainId in WNATIVE) {
  //   wethAddress = WNATIVE[chainId].address
  // } else {
  //   throw Error("No WNATIVE!")
  // }
  await deploy([UniswapV2Factory.address, WETH.address])
})
