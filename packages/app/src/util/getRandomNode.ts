import { nodes } from 'constants/nodes'

function random(max) {
  return Math.floor(Math.random() * max)
}

export const getRandomNode = (chainId?: number) => {
  if (nodes[chainId] == null) chainId = 97
  const chainNodes = nodes[chainId]
  const n = random(chainNodes.length)
  const nodeURL = chainNodes[n]
  return nodeURL
}

export default getRandomNode
