import { ZooClientContext } from '../ZooClientProvider'
import { useContext } from 'react'

export default function () {
  return useContext(ZooClientContext)
}
