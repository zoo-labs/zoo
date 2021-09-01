// 12_media.js

import { Deploy } from '@zoolabs/contracts/utils/deploy'

export default Deploy('Media', ['Market'], async({ deploy }) => {
  await deploy(['Crypto Animal', 'ANML'])
})
