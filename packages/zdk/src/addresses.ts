import rinkebyAddresses from '@zoolabs/contracts/dist/addresses/4.json'
import mainnetAddresses from '@zoolabs/contracts/dist/addresses/1.json'
import polygonAddresses from '@zoolabs/contracts/dist/addresses/137.json'
import polygonMumbaiAddresses from '@zoolabs/contracts/dist/addresses/80001.json'

interface AddressBook {
  [key: string]: {
    [key: string]: string
  }
}

/**
 * Mapping from Network to Officially Deployed Instances of the Zoo Media Protocol
 */
export const addresses: AddressBook = {
  rinkeby: rinkebyAddresses,
  mainnet: mainnetAddresses,
  polygon: polygonAddresses,
  polygonMumbai: polygonMumbaiAddresses,
}
