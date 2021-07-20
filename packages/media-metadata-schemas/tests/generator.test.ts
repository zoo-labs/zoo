import { Generator } from '../src/generator'

describe('Generator', () => {
  describe('#constructor', () => {
    it('raises when an unsupported schema version is specified', () => {
      expect(() => {
        new Generator('zoo-20190101')
      }).toThrow(
        'There are no versions in the zoo namespace with the 20190101 calendar version'
      )

      expect(() => {
        new Generator('coinbase-20190101')
      }).toThrow('There are no versions with the coinbase project name')
    })
  })

  describe('#generate', () => {
    it('generates valid alphabetized, minified json', () => {
      const generator = new Generator('zoo-20210101')
      const unordered = {
        name: 'zoo whitepaper',
        mimeType: 'application/json',
        version: 'zoo-20210101',
        description: 'internet renaissance'
      }
      const ordered = generator.generateJSON(unordered)
      const expected = require('../fixtures/zoo20210101_minified.json')
      expect(ordered).toBe(JSON.stringify(expected))
    })

    it("raises if the unorder json does not conform to version's schema", () => {
      const generator = new Generator('zoo-20210101')
      const unordered = {
        name: 'zoo whitepaper',
        mimeType: 'application/json',
        version: 'zoo-20210101',
        description: 'internet renaissance',
        someAdditionalProperty: 'stuff'
      }
      expect(() => {
        generator.generateJSON(unordered)
      }).toThrow('JSON does not conform to the zoo-20210101 schema.')
    })
  })
})
