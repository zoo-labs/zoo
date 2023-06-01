[View code on GitHub](zoo-labs/zoo/blob/master/core/src/features/analytics/Tokens/TokenList.tsx)

The `TokenList` module is a React component that renders a table of token data. It takes in an array of `Token` objects, which contain information about a token's address, symbol, liquidity, volume, price, and price change over the past day and week. The component also accepts an optional array of `TokenListColumnType` values, which determine which columns are displayed in the table. 

The `TokenList` component uses the `Table` component from `../../../components/Table` to render the table. The `Table` component takes in an array of `Column` objects, which define the columns of the table. The `TokenListColumns` object defines the columns that can be displayed in the table, including the token name, price, liquidity, price change, volume change, and a line graph of the token's price over the past week. 

The `TokenListName` component is used to render the token name column. It takes in a `token` object and uses the `useCurrency` hook from `../../../hooks/Tokens` to get the currency associated with the token's address. It then renders the currency logo and token symbol in a `div` element. 

The `TokenListColumns` object defines the other columns of the table. The `price`, `liquidity`, `priceChange`, and `volumeChange` columns use the `formatNumber` and `formatPercent` functions from `../../../functions` to format the data. The `lastWeekGraph` column renders a line graph of the token's price over the past week using the `LineGraph` component from `../../../components/LineGraph`. 

Overall, the `TokenList` component provides a flexible and customizable way to display token data in a table format. It can be used in the larger project to display token data in various contexts, such as on a dashboard or analytics page. 

Example usage:

```
import TokenList from './TokenList'

const tokens = [
  {
    token: {
      address: '0x123abc',
      symbol: 'ABC',
    },
    liquidity: 1000,
    volume1d: 500,
    volume1w: 3000,
    price: 1.23,
    change1d: 0.05,
    change1w: -0.1,
  },
  // more token objects...
]

const enabledColumns = ['name', 'price', 'liquidity', 'priceChange', 'volumeChange', 'lastWeekGraph']

function MyComponent() {
  return (
    <div>
      <TokenList tokens={tokens} enabledColumns={enabledColumns} />
    </div>
  )
}
```
## Questions: 
 1. What is the purpose of the `TokenList` component?
- The `TokenList` component is used to display a table of token data, including columns for name, price, liquidity, price change, volume change, and a line graph of the token's performance over the last week.

2. What is the `Token` interface used for?
- The `Token` interface defines the shape of an object that contains data about a token, including its address, symbol, liquidity, volume, price, and price change over the last day and week.

3. What is the `TokenListColumns` object used for?
- The `TokenListColumns` object is a mapping of column names to their respective configurations, including the column header, data accessor, cell renderer, and sorting behavior. It is used to define the columns that should be displayed in the `TokenList` table.