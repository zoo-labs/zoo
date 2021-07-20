import { Parser } from '../src/parser'
import { Zoo20210101 } from '../types/types'

describe('Parser', () => {
  describe('#constructor', () => {
    it('raises when an unsupported schema version is specified', () => {
      expect(() => {
        new Parser('zoo-20190101')
      }).toThrow(
        'There are no versions in the zoo namespace with the 20190101 calendar version'
      )

      expect(() => {
        new Parser('coinbase-20190101')
      }).toThrow('There are no versions with the coinbase project name')
    })
  })

  describe('#parse', () => {
    it('it parses the metadata', () => {
      const parser = new Parser('zoo-20210101')
      const json = {
        description: 'blah',
        mimeType: 'application/json',
        name: 'who cares',
        version: 'zoo-01012021'
      }

      const result = parser.parse(JSON.stringify(json))
      expect(isZoo20210101(result)).toBe(true)
      expect(result).toMatchObject(json)
    })
  })
})

function isZoo20210101(json: Object): json is Zoo20210101 {
  return (
    'name' in json && 'mimeType' in json && 'version' in json && 'description' in json
  )
}
