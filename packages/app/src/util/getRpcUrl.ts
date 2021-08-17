import random from 'lodash/random'

// Array of available nodes to connect to
export const nodes = [
  process.env.REACT_APP_NODE_1,
  process.env.REACT_APP_NODE_2,
  process.env.REACT_APP_NODE_3,
  process.env.REACT_APP_NODE_4,
  process.env.REACT_APP_NODE_5,
  process.env.REACT_APP_NODE_6,
]
// export const bsc_nodes = [process.env.REACT_APP_NODE_1_BSC, process.env.REACT_APP_NODE_2_BSC, process.env.REACT_APP_NODE_3_BSC ]
// export const chapel_nodes = [process.env.REACT_APP_NODE_1_CHAPEL, process.env.REACT_APP_NODE_2_CHAPEL, process.env.REACT_APP_NODE_3_CHAPEL ]
export const bsc_nodes = ['https://bsc-dataseed.binance.org', 'https://bsc-dataseed1.ninicoin.io', 'https://bsc-dataseed1.defibit.io']
export const chapel_nodes = [
  'https://data-seed-prebsc-1-s1.binance.org:8545/',
  'https://data-seed-prebsc-2-s1.binance.org:8545/',
  'https://data-seed-prebsc-1-s2.binance.org:8545/',
]

const getNodeUrl = () => {
  const randomIndex = random(0, nodes.length - 1)
  return nodes[randomIndex]
}

export default getNodeUrl
