import { contenthashToUri, uriToHttp } from './convert'

import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { DEFAULT_LIST_OF_LISTS } from '../config/token-lists'
import { TokenList } from '@uniswap/token-lists'
import { Version } from '@uniswap/token-lists'
import { parseENSAddress } from './ens'
import schema from '@uniswap/token-lists/src/tokenlist.schema.json'

// Initialize Ajv and register formats
const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

// Compile the schema
const tokenListValidator = ajv.compile(schema)

/**
 * Contains the logic for resolving a list URL to a validated token list
 * @param listUrl list url
 * @param resolveENSContentHash resolves an ens name to a contenthash
 */
export async function getTokenList(
  listUrl: string,
  resolveENSContentHash: (ensName: string) => Promise<string>
): Promise<TokenList> {
  const parsedENS = parseENSAddress(listUrl)
  let urls = uriToHttp(listUrl)
  if (parsedENS) {
    let contentHashUri: string
    try {
      contentHashUri = await resolveENSContentHash(parsedENS.ensName)
      let translatedUri: string
      translatedUri = contenthashToUri(contentHashUri)
      urls = uriToHttp(`${translatedUri}${parsedENS.ensPath ?? ''}`)
    } catch (error) {
      console.debug(`Failed to resolve ENS name: ${parsedENS}`, error)
      // throw new Error(`Failed to resolve ENS name: ${parsedENS.ensName}`)
    }
  }
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    const isLast = i === urls.length - 1
    let response
    try {
      response = await fetch(url)
    } catch (error) {
      if (isLast) throw new Error(`Failed to download list ${listUrl}`)
      continue
    }

    if (!response.ok) {
      if (isLast) throw new Error(`Failed to download list ${listUrl}`)
      continue
    }

    const json = await response.json()
    if (!tokenListValidator(json)) {
      const validationErrors: string =
        tokenListValidator.errors?.reduce<string>((memo, error) => {
          const typedError = error as unknown as { dataPath: string; message?: string };
          const add = `${typedError.dataPath} ${typedError.message ?? ''}`;
          return memo.length > 0 ? `${memo}; ${add}` : `${add}`;
        }, '') ?? 'unknown error'
      throw new Error(`Token list failed validation: ${validationErrors}`)
    }
    return json as TokenList;
  }
  throw new Error('Unrecognized list URL protocol.')
}

// use ordering of default list of lists to assign priority
export function sortByListPriority(urlA: string, urlB: string) {
  const first = DEFAULT_LIST_OF_LISTS.includes(urlA) ? DEFAULT_LIST_OF_LISTS.indexOf(urlA) : Number.MAX_SAFE_INTEGER
  const second = DEFAULT_LIST_OF_LISTS.includes(urlB) ? DEFAULT_LIST_OF_LISTS.indexOf(urlB) : Number.MAX_SAFE_INTEGER

  // need reverse order to make sure mapping includes top priority last
  if (first < second) return 1
  else if (first > second) return -1
  return 0
}

export function listVersionLabel(version: Version): string {
  return `v${version.major}.${version.minor}.${version.patch}`
}
