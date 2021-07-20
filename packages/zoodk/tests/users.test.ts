import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { getZooProfiles } from '../src'

jest.setTimeout(1000000)

describe('Users', () => {
  describe('getZooProfiles', () => {
    const zooProfilesApiUri = 'https://zoo.co/api/users'
    describe('success', () => {
      it('makes a POST request to /api/users and returns data', async () => {
        let mock = new MockAdapter(axios)
        mock.onPost(zooProfilesApiUri).reply(200, [{ foo: 'bar' }])
        const profiles = await getZooProfiles(['test'])
        expect(profiles).toEqual([{ foo: 'bar' }])
      })
    })
    describe('input validation', () => {
      it('raises if empty addresses', async () => {
        const spy = jest.spyOn(axios, 'post')
        try {
          await getZooProfiles([])
          throw new Error('should throw')
        } catch (err) {
          expect(err).toEqual(Error('Empty addresses array'))
        }
        expect(spy).not.toHaveBeenCalled()
      })

      it('raises if too many addresses', async () => {
        const spy = jest.spyOn(axios, 'post')
        const addresses = Array.from(new Array(101), () => '0sdf987sdf')
        try {
          await getZooProfiles(addresses)
          throw new Error('should throw')
        } catch (err) {
          expect(err).toEqual(Error('Addresses array exceeds max length of 100'))
        }
        expect(spy).not.toHaveBeenCalled()
      })
    })

    describe('request error handling', () => {
      let mock: MockAdapter
      beforeEach(() => {
        mock = new MockAdapter(axios)
      })

      it('throws with error message from response', async () => {
        mock.onPost(zooProfilesApiUri).reply(400, 'Custom error message from zoo api')
        try {
          await getZooProfiles(['asdf', '1234'])
          throw new Error('should throw')
        } catch (err) {
          expect(err).toEqual(Error('Custom error message from zoo api'))
        }
      })

      it('raises if axios request fails', async () => {
        mock.onPost(zooProfilesApiUri).networkError()
        try {
          await getZooProfiles(['asdf', '1234'])
          throw new Error('should throw')
        } catch (err) {
          expect(err).toEqual(Error('Network Error'))
        }
      })
      it('raises if axios response has no data', async () => {
        mock.onPost(zooProfilesApiUri).reply(200, null)
        try {
          await getZooProfiles(['asdf', '1234'])
          throw new Error('should throw')
        } catch (err) {
          expect(err).toEqual(Error('Error retrieving users'))
        }
      })
      it('raises if axios response data is not a list', async () => {
        mock.onPost(zooProfilesApiUri).reply(200, {})
        try {
          await getZooProfiles(['asdf', '1234'])
          throw new Error('should throw')
        } catch (err) {
          expect(err).toEqual(Error('Error retrieving users'))
        }
      })
      it('raises if axios response data is empty', async () => {
        mock.onPost(zooProfilesApiUri).reply(200, [])
        try {
          await getZooProfiles(['asdf', '1234'])
          throw new Error('should throw')
        } catch (err) {
          expect(err).toEqual(Error('Error retrieving users'))
        }
      })
    })
  })
})
