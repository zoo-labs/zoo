import { ParsedQs, parse } from 'qs'

import { useMemo } from 'react'

export default function useParsedQueryString(): ParsedQs {
  // const { search } = useLocation()
  // eslint-disable-next-line no-restricted-globals
  const search = location.search
  return useMemo(() => (search && search.length > 1 ? parse(search, { parseArrays: false, ignoreQueryPrefix: true }) : {}), [search])
}
