import { nodes } from 'constants/nodes'

function random(max) {
  return Math.floor(Math.random() * max)
}

export const getRandomNode = (chainID? : number) => {
  if (nodes[chainID] == null) chainID = 97
  console.log('getRandomNode', chainID)
  const chainNodes = nodes[chainID]
  const n = random(chainNodes.length)
  const nodeURL = chainNodes[n]
  console.log('using node', nodeURL)
  return nodeURL
}

export default getRandomNode
