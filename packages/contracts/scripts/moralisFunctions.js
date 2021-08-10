const fs    = require('fs')
const spawn = require('child_process').spawn

const NETWORK  = process.env.NETWORK ? process.env.NETWORK : 'localhost'

const CHAIN_ID = {
  localhost: '0x539',
  testnet:   '0x61',
  mainnet:   '0x38',
}[NETWORK]

const SUBDOMAIN = {
  localhost: 'qjydxwdegh7e.usemoralis.com',
  testnet:   'dblpeaqbqk32.usemoralis.com',
  mainnet:   'j0ixlvmwc1kz.usemoralis.com',
}[NETWORK]

const moralisJS = fs.readFileSync(__dirname + '/../functions/moralis.js')
const zkJSON    = fs.readFileSync(__dirname + `/../deployments/${NETWORK}/ZooKeeper.json`)
const cloudFunctions = String(moralisJS).replace('CHAIN_ID', CHAIN_ID).replace('ZOOKEEPER', zkJSON)
fs.writeFileSync(__dirname + '/../cache/moralis.js', cloudFunctions)

const child = spawn('node', ['node_modules/.bin/moralis-admin-cli', 'watch-cloud-file', '--moralisSubdomain', SUBDOMAIN, '--moralisCloudFile', 'cache/moralis.js'], { shell: true })

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
