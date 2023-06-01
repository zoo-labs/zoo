[View code on GitHub](zoo-labs/zoo/blob/master/core/src/features/analytics/Farms/FarmList.tsx)

The `FarmList` component is a React component that renders a table of farming pools. It takes an array of `pools` as a prop, where each pool is an object containing information about the pool's pair, rewards, liquidity, and APR. The component uses several other components and hooks to render the table, including `Table`, `DoubleCurrencyLogo`, `useCurrency`, `Image`, `ColoredNumber`, `formatNumber`, `formatNumberScale`, and `formatPercent`.

The `FarmListName` component is a subcomponent of `FarmList` that renders the name and logo of a pool's pair. It takes a `pair` prop, which is an object containing information about the pair's tokens, name, and type. It uses the `useCurrency` hook to get the currency objects for the pair's tokens, and the `DoubleCurrencyLogo` component to render the pair's logo.

The `Rewards` component is another subcomponent of `FarmList` that renders the rewards for a pool. It takes a `rewards` prop, which is an array of objects containing information about each reward's icon, token, and reward per day. It uses the `Image` component to render each reward's icon, and the `formatNumber` function to format each reward's reward per day.

The `FarmList` component uses the `useMemo` hook to memoize the `defaultSortBy` and `columns` variables. `defaultSortBy` is an object that specifies the default sorting for the table, and `columns` is an array of objects that specify the columns of the table. Each column object has a `Header` property that specifies the column header, an `accessor` property that specifies the data accessor for the column, a `Cell` property that specifies the cell renderer for the column, and an `align` property that specifies the alignment of the column. The `apr` column also has a `sortType` property that specifies a custom sorting function based on the annual APR.

Finally, the `FarmList` component renders the `Table` component with the `columns` and `data` props, and the `defaultSortBy` prop if specified. If `pools` is falsy, the component renders nothing.

This component can be used to display a list of farming pools with their APR, liquidity, and rewards. It can be customized by changing the `columns` array to add or remove columns, or by changing the `Cell` property of each column to customize the rendering of each cell. It can also be styled using CSS classes or inline styles. Here is an example usage of the `FarmList` component:

```jsx
import FarmList from './FarmList'

const pools = [
  {
    pair: {
      token0: {
        id: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      },
      token1: {
        id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
      name: 'UNI-ETH',
      type: 'Sushi Farm',
    },
    rewards: [
      {
        icon: '/tokens/uni.png',
        token: 'UNI',
        rewardPerDay: 1000,
      },
      {
        icon: '/tokens/sushi.png',
        token: 'SUSHI',
        rewardPerDay: 500,
      },
    ],
    liquidity: 1000000,
    apr: {
      annual: 1000,
      monthly: 100,
      daily: 10,
    },
  },
  // more pools...
]

function App() {
  return <FarmList pools={pools} />
}
```
## Questions: 
 1. What external libraries or dependencies are being used in this code?
- The code is importing several modules from external libraries such as lodash, React, and next/image.

2. What is the purpose of the `FarmList` component and what props does it expect?
- The `FarmList` component is the main component that renders a table of farming pools. It expects a prop called `pools` which is an array of objects containing information about each pool.

3. What is the purpose of the `Rewards` component and what props does it expect?
- The `Rewards` component is a sub-component of `FarmList` that renders the daily rewards for each pool. It expects a prop called `rewards` which is an array of objects containing information about each reward.