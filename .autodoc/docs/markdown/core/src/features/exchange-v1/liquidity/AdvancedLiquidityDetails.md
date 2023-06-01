[View code on GitHub](zoo-labs/zoo/blob/master/core/src/features/exchange-v1/liquidity/AdvancedLiquidityDetails.tsx)

The code in this file defines two React components: `TradeSummary` and `AdvancedLiquidityDetails`. These components are part of a larger project called "zoo" and are used to display information related to a user's liquidity pool tokens and fees.

The `TradeSummary` component renders a summary of the user's pool tokens, pool share, liquidity provider fee, and network fee. This information is displayed using the `RowBetween` and `RowFixed` components from the `../../../components/Row` module and the `AutoColumn` component from the `../../../components/Column` module. The `RowBetween` component is used to display two items side-by-side with equal spacing between them, while the `RowFixed` component is used to display a single item without any spacing. The `AutoColumn` component is used to stack the rows vertically.

The `AdvancedLiquidityDetails` component simply renders the `TradeSummary` component within an `AutoColumn` component with a gap of 0 pixels. This component is exported along with an interface called `AdvancedLiquidityDetailsProps` that has a single optional property called `show`.

Overall, these components are used to display important information related to a user's liquidity pool tokens and fees in a clear and concise manner. They can be easily integrated into other parts of the "zoo" project to provide users with a better understanding of their liquidity pool activity. Here is an example of how the `AdvancedLiquidityDetails` component might be used:

```
import AdvancedLiquidityDetails from 'zoo/components/AdvancedLiquidityDetails'

function MyPage() {
  return (
    <div>
      <h1>My Liquidity Pool Details</h1>
      <AdvancedLiquidityDetails show={true} />
    </div>
  )
}
```
## Questions: 
 1. What is the purpose of the `TradeSummary` function?
- The `TradeSummary` function returns a JSX component that displays information about the user's pool tokens, pool share, liquidity provider fee, and network fee.

2. What is the `AdvancedLiquidityDetails` function used for?
- The `AdvancedLiquidityDetails` function returns a JSX component that includes the `TradeSummary` component and is wrapped in an `AutoColumn` component with a gap of "0px". It also includes an optional `show` prop.

3. What are the `RowBetween` and `RowFixed` components used for?
- The `RowBetween` and `RowFixed` components are imported from the `Row` module and are used to create rows of content with flexible and fixed widths, respectively. They are used in the `TradeSummary` function to display the different pieces of information.