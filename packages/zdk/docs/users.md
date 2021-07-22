## Users

See the below example usage of `getZooProfiles`, which queries the Zoo profile information of a batch of ETH addresses (up to 100).

```typescript
import { getZooProfiles } from '@cryptozoo/zdk'

;(async () => {
  const addresses = [
    '0xBE7eb2a7A9C949322F6CCAA1c857FC227fB14CEd',
    '0xc4f3f37f7020fe4d354e18618bea5c52e3775ee2',
  ]
  const result = await getZooProfiles(addresses)
  console.log(result)
  /*
    [
      {
        address: '0xBE7eb2a7A9C949322F6CCAA1c857FC227fB14CEd',
        bio: null,
        name: 'james',
        profileImageAsset: 'bafybeid2anzzz5gf2e7yxzdcblxbka7i6e6f7lctkc3em3j56pyfv57uti',
        username: 'jcg',
        website: null,
        verified: null
      },
      {
        address: '0xc4F3f37F7020FE4d354e18618BEA5c52e3775ee2',
        bio: '',
        name: 'Vince Mckelvie ',
        profileImageAsset: 'bafybeieuxjthtj2boaf6azkepp26cc4v6apc5fd5aqceaug4rrnkj7hz6q',
        username: 'vincemckelvie',
        website: 'http://vincemckelvie.com',
        verified: null
      }
    ]
  */
})()
```
