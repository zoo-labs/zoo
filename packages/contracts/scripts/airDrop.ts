import { ethers } from 'hardhat'
import parse from 'csv-parse/lib/sync'
import assert from 'assert'
import fs from 'fs'

import ZOO from '../deployments/testnet/ZOO.json'

async function main() {
  const [signer]  = await ethers.getSigners()
  const zoo = await (await ethers.getContractAt('ZOO', ZOO.address)).connect(signer)

  const addresses = []
  const amounts   = []

  const input = fs.readFileSync('holders.csv')

  // key_1: 'value 1', key_2: 'value 2'
  // address: 'amount'
  const records = parse(input, {
    columns: true,
    skip_empty_lines: true
  })

  console.log(records)

  // load in addresses
  for (let i = 0; i < records.length; i++) {
    const row = Object.values(records[i])
    addresses.push(row[0])
    amounts.push(parseInt(String(row[1]).replace(/[, ]/g, '')))
  }

  console.log(addresses, amounts)
  await zoo.airdrop(addresses, amounts)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

