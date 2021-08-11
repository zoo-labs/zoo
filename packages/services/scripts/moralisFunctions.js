const fs = require('fs')
const spawn = require('child_process').spawn

const NETWORK = process.env.NETWORK ? process.env.NETWORK : 'localhost'

const chainID = {
  localhost: '0x539',
  testnet: '0x61',
  mainnet: '0x38',
}[NETWORK]

const subdomain = {
  localhost: 'qjydxwdegh7e.usemoralis.com',
  testnet: 'dblpeaqbqk32.usemoralis.com',
  mainnet: 'j0ixlvmwc1kz.usemoralis.com',
}[NETWORK]

const cached = __dirname + '/../node_modules/moralis-cached.js'
const funcJS = fs.readFileSync(__dirname + '/../moralis/functions.js')
const zkJSON = fs.readFileSync(__dirname + `/../../contracts/deployments/${NETWORK}/ZooKeeper.json`)
const cloudFunctions = String(funcJS)
  .replace('CHAIN_ID', chainID)
  .replace('ZOOKEEPER', zkJSON)

fs.writeFileSync(cached, cloudFunctions)

const child = spawn('node', ['node_modules/.bin/moralis-admin-cli', 'watch-cloud-file', '--moralisSubdomain', subdomain, '--moralisCloudFile', cached], { shell: true })

child.stdout.on('data', (data) => {
  if (String(data).match(/File Uploaded Correctly/)) {
    console.log(`Updated Cloud Functions for ${NETWORK}`)

    child.kill('SIGHUP')
    process.exit(0)
  }

  // anything else should be logged
  console.error(String(data))
  if (String(data).match(/File Uploaded Failed/)) {
    child.kill('SIGHUP')
    process.exit(1)
  }
})
