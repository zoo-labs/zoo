[View code on GitHub](zoo-labs/zoo/blob/master/core/src/features/onsen/FarmList.tsx)

The `FarmList` component is a React component that renders a list of farms. It receives two props: `farms`, which is an array of farm objects, and `term`, which is a search term used to filter the farms. 

The component uses the `useSortableData` hook to enable sorting of the farms by different criteria such as symbol, TVL, and APR. The sorting is triggered by clicking on the corresponding column header, which calls the `requestSort` function with the appropriate key. The current sort configuration is stored in the `sortConfig` object, which is used to display an up or down arrow next to the column header to indicate the sort direction.

The component also uses the `useInfiniteScroll` hook to enable infinite scrolling of the farms. The `numDisplayed` state variable keeps track of the number of farms currently displayed, and is updated by the `setNumDisplayed` function when the user scrolls to the bottom of the list. The `InfiniteScroll` component from the `react-infinite-scroll-component` library is used to detect when the user has reached the bottom of the list and trigger the loading of more farms.

Each farm in the list is rendered using the `FarmListItem` component, which receives a single `farm` prop. The `FarmListItem` component is not shown in this code snippet, but it is likely responsible for rendering the individual farm details such as the farm name, symbol, TVL, and APR.

Overall, the `FarmList` component provides a flexible and interactive way to display and sort a list of farms, while also enabling infinite scrolling to handle large lists. It can be used as a standalone component or as part of a larger project that involves displaying and managing farms. 

Example usage:

```jsx
import FarmList from './FarmList'

const farms = [
  { symbol: 'ETH-USDT', tvl: 1000000, roiPerYear: 0.1 },
  { symbol: 'BTC-USDT', tvl: 2000000, roiPerYear: 0.2 },
  { symbol: 'USDC-USDT', tvl: 3000000, roiPerYear: 0.3 },
]

function App() {
  return (
    <div>
      <FarmList farms={farms} />
    </div>
  )
}
```
## Questions: 
 1. What is the purpose of the `useSortableData` hook?
   - The `useSortableData` hook is used to sort the `farms` array based on the user's request.

2. What is the purpose of the `InfiniteScroll` component?
   - The `InfiniteScroll` component is used to render a list of `FarmListItem` components and load more items as the user scrolls down the page.

3. What is the purpose of the `Dots` component?
   - The `Dots` component is used to display a loading animation while the `farms` data is being fetched.