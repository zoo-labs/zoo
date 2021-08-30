import { setupTestFactory, requireDependencies } from './utils'
import { Signer } from '@ethersproject/abstract-signer'
import { Savage } from '../types'

import { BigNumber } from 'ethers';
const { expect } = requireDependencies()
const ZERO_ADDR = '0x0000000000000000000000000000000000000000'

const setupTest = setupTestFactory(['Savage'])

describe.only('Savage', function () {
  let savage: Savage
  let signers: Signer[]

  beforeEach(async () => {
    const test = await setupTest()
    savage = test.tokens.Savage as Savage
    signers = test.signers
  })

  it('should be savage', async function () {
    await savage.swap()
  })
})
