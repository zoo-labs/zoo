// 03_v2factory.ts

import { Deploy } from '@zoolabs/contracts/utils/deploy'

// // Defining bytecode and abi from original contract on mainnet to ensure bytecode matches and it produces the same pair code hash
// import {
//   bytecode,
//   abi,
// } from "../artifacts/src/uniswapv2/UniswapV2Factory.sol/UniswapV2Factory.json"

// export default async function ({
//   ethers,
//   getNamedAccounts,
//   deployments,
//   getChainId,
// }) {
//   const { deploy } = deployments;

//   const { deployer, dao } = await getNamedAccounts();

//   await deploy("UniswapV2Factory", {
//     // contract: {
//     //   abi,
//     //   bytecode,
//     // },
//     from: deployer,
//     args: [dao],
//     log: true,
//     deterministicDeployment: false,
//   });
// };

// module.exports.tags = ["UniswapV2Factory", "AMM"];

export default Deploy('UniswapV2Factory', [], async({ getNamedAccounts, hre, deploy, deployments, deps }) => {
  const { deployer, dao } = await getNamedAccounts()
  await deploy([dao])
})
