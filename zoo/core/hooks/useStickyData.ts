import { useRef } from 'react'

function useStickyData<T>(value: T | undefined) {
  const val = useRef<T | null>(null)
  if (value !== undefined) val.current = value
  return val.current
}

export default useStickyData
