[View code on GitHub](zoo-labs/zoo/blob/master/core/src/features/kashi/MarketHeader.tsx)

The `MarketHeader` function is a React component that renders a header for a market page. It takes two props: `type` and `lists`. The `type` prop is a string that specifies the type of market (either "Borrow" or "Lend"), and the `lists` prop is an object that contains an array of market lists and a function to set the search term for those lists.

The component renders a `Card.Header` component from the `Card` module, which is a custom component that provides a styled header for the market page. The `className` prop of the `Card.Header` component is set based on the `type` prop, which determines the background color and border color of the header.

The header contains two sections: a title section and a search section. The title section displays the `type` prop as a large text element. The search section contains an input field and a search icon. The input field is used to search for market items by symbol. When the user types into the input field, the `onSearch` function is called, which sets the search term for each market list in the `lists` prop. The search term is passed to the input field as its value, and the search icon is positioned to the right of the input field.

The `MarketHeader` component is used in the larger market page to provide a consistent header across different market types. It allows users to search for market items by symbol, and it provides visual cues to help users distinguish between different market types. Here is an example of how the `MarketHeader` component might be used in a market page:

```
import React from 'react'
import MarketHeader from './MarketHeader'
import MarketList from './MarketList'

function BorrowMarket() {
  const lists = [
    {
      name: 'Borrow',
      items: [
        { symbol: 'ETH', rate: '5%', amount: '$100,000' },
        { symbol: 'BTC', rate: '4%', amount: '$50,000' },
        { symbol: 'USDT', rate: '3%', amount: '$10,000' },
      ],
      setTerm: (term) => console.log(`Setting search term to ${term}`),
      term: '',
    },
  ]

  return (
    <div>
      <MarketHeader type="Borrow" lists={lists} />
      <MarketList list={lists[0]} />
    </div>
  )
}

export default BorrowMarket
```
## Questions: 
 1. What is the purpose of the `MarketHeader` function and what are its expected inputs and outputs?
- The `MarketHeader` function is a React component that returns a `Card.Header` element with a title, search input, and search icon. It takes in two props: `type` (default value of 'Borrow') and `lists`, and returns a JSX element.

2. What is the purpose of the `onSearch` function and how is it used?
- The `onSearch` function is called when the user types into the search input and updates the search term for each list in the `lists` array. It is used as an event handler for the `onChange` event of the search input.

3. What is the purpose of the `classNames` function and where is it imported from?
- The `classNames` function is used to conditionally apply CSS classes to the `Card.Header` element based on the value of the `type` prop. It is imported from a file located at `../../functions`.