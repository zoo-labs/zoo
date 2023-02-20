import { paths } from '@zoolabs/sdk'
import useSWR, { SWRConfiguration } from 'swr'
import useZooClient from './useZooClient'

type AttributesResponse =
  paths['/collections/{collection}/attributes/all/v2']['get']['responses']['200']['schema']

export default function (
  collection?: string | undefined,
  chainId?: number,
  swrOptions: SWRConfiguration = {}
) {
  const client = useZooClient()
  const chain =
    chainId !== undefined
      ? client?.chains.find((chain) => chain.id === chainId)
      : client?.currentChain()

  const pathname = `${chain?.baseApiUrl}/collections/${collection}/attributes/all/v2`

  const path = collection ? new URL(pathname) : null

  const { data, mutate, error, isValidating } = useSWR<AttributesResponse>(
    path ? [path.href, chain?.apiKey, client?.version] : null,
    null,
    {
      revalidateOnMount: true,
      ...swrOptions,
    }
  )
  const collections: AttributesResponse['attributes'] | null =
    data && data.attributes ? data.attributes : null

  return { response: data, data: collections, mutate, error, isValidating }
}
