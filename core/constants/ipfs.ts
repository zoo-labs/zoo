import { ChainId } from '@zoolabs/zdk'
import localhostUploads from '../ipfs/localhost.json'

export default {
  [ChainId.MAINNET]: localhostUploads,
  [ChainId.RINKEBY]: localhostUploads,
  [ChainId.HARDHAT]: localhostUploads,
}
