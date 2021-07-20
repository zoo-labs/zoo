import rinkebyAddresses from '@zoolabs/core/dist/addresses/4.json'
import mainnetAddresses from '@zoolabs/core/dist/addresses/1.json'
import polygonAddresses from '@zoolabs/core/dist/addresses/137.json'
import polygonMumbaiAddresses from '@zoolabs/core/dist/addresses/80001.json'

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
