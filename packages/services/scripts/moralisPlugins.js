const axios = require('axios')
const fs = require('fs')

require('dotenv').config()
const utils = require('moralis-admin-cli/utils')
const { BASE_URI } = require('moralis-admin-cli/config')
const { restartServer } = require('moralis-admin-cli/commands/common')

const NETWORK = process.env.NETWORK ? process.env.NETWORK : 'localhost'
const CHAIN_IDS = {
  localhost: '0x539',
  testnet: '0x61',
  mainnet: '0x38',
}
const CHAIN_ID = CHAIN_IDS[NETWORK]
const SERVER_NAME = {
  localhost: 'zoo Hardhat',
  testnet: 'Zoo Testnet',
  mainnet: 'Zoo Mainnet',
}[NETWORK]
const ABI_PATH = `${__dirname}/../../contracts/deployments/${NETWORK}/ZooKeeper.json`

/**
 * Configures the events to subscribe to on a smart contract based on the abi file
 */
;(async () => {
  console.log(`Updating Plugins for ${NETWORK}`)

  try {
    // Get credentials
    const apiKey = utils.getApiKey()
    const apiSecret = utils.getApiSecret()

    // Load servers
    const servers = await utils.getUserServers()
    if (servers.length == 0) {
      console.log('No servers found!')
      return
    }

    // Get the server to apply the event syncs to
    const server = servers.filter((item) => item.updateCloudError === 0 && item.update === 0 && item.enabledEvms && item.name == SERVER_NAME)[0]

    // read the abi
    fs.readFile(ABI_PATH, 'utf8', async function read(err, data) {
      // Check for errors
      if (err) {
        console.log(`Error reading file from disk: ${err}`)
        return
      }

      // get the events from the abi
      const contract = JSON.parse(data)
      const abiEvents = contract.abi.filter((item) => item.type == 'event')
      if (!abiEvents) {
        console.log('Could not read ABI')
      }

      // Function for fixing datatypes
      const fixType = (type) => (type == 'uint' ? 'uint256' : type)

      // function for getting the topic
      const getTopic = (item) => `${item.name}(${item.inputs.reduce((a, o) => (a.push(fixType(o.type)), a), []).join()})`

      // Get a list of all the available events to choose from
      const eventNames = abiEvents.reduce((a, o, i) => (a.push(`\n${o.name}`), a), []).join('')

      // Ensure the default plugins are installed
      const plugins = [
        {
          id: 1,
          path: './evm/consumer',
          options: [],
        },
        {
          id: 2,
          path: './evm/historical/transactions',
          options: [],
        },
        {
          id: 3,
          path: './evm/blocks',
          options: [],
        },
        {
          id: 4,
          path: './evm/balances',
          options: [],
        },
        {
          id: 5,
          path: './convenience/index',
          options: [],
        },
      ]

      // Loop through events in ZooKeeper ABI
      for (let i = 0; i < abiEvents.length; i++) {
        const event = abiEvents[i]
        const description = event.name
        const contractAddress = contract.address
        const tableName = event.name
        const topic = getTopic(event)

        // Define the new plugin
        const plugin = {
          id: 6,
          path: './evm/events',
          order: 5,
          options: {
            description: description,
            abi: event,
            topic: topic,
            address: contractAddress,
            tableName: tableName,
            chainId: CHAIN_ID,
          },
        }

        console.log('Adding plugin for: ', event.name, contractAddress)

        // Push the plugin to the list
        plugins.push(plugin)
      }

      // Post updated plugins to the api
      console.log('\nPushing contract events...')
      await axios.post(`${BASE_URI}/api/cli/updateServerPlugins`, {
        apiKey,
        apiSecret,
        parameters: {
          serverId: server.id,
          plugins: JSON.stringify(plugins),
        },
      })
      console.log('Successfully saved the contract events!')

      // Restart server to apply sync
      await restartServer(apiKey, apiSecret, server)
      console.log('Events are now subscribed to!')
    })
  } catch (e) {
    console.log('Unexpected error')
    console.log(e)
  }
})()
