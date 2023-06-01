[View code on GitHub](zoo-labs/zoo/blob/master/app/components/primitives/FormatCryptoCurrency.tsx)

The `FormatCryptoCurrency` module is a React component that formats and displays cryptocurrency values with an associated icon. It imports the `FormatCrypto` and `CryptoCurrencyIcon` components from other files in the `zoo` project. 

The `FormatCryptoCurrency` component takes in several props, including `amount`, `address`, `maximumFractionDigits`, `logoHeight`, `textStyle`, `css`, and `decimals`. The `amount` prop is the value of the cryptocurrency to be formatted and displayed. The `address` prop is an optional string that represents the address of the cryptocurrency. The `maximumFractionDigits` prop is an optional number that specifies the maximum number of decimal places to display. The `logoHeight` prop is an optional number that specifies the height of the associated cryptocurrency icon. The `textStyle` and `css` props are optional objects that allow for custom styling of the formatted text and icon, respectively. The `decimals` prop is an optional number that specifies the number of decimal places to display.

The `FormatCryptoCurrency` component renders the `FormatCrypto` component with the `amount`, `maximumFractionDigits`, and `decimals` props passed in. It also renders the `CryptoCurrencyIcon` component with the `logoHeight` and `address` props passed in. The `CryptoCurrencyIcon` component displays the icon associated with the specified cryptocurrency address.

This component can be used in the larger `zoo` project to display cryptocurrency values with their associated icons in a consistent and formatted manner. For example, it could be used in a wallet or portfolio view to display the current value of various cryptocurrencies. 

Example usage:

```
import FormatCryptoCurrency from './FormatCryptoCurrency'

const MyComponent = () => {
  return (
    <div>
      <FormatCryptoCurrency amount={0.123456789} address="0x123abc" />
    </div>
  )
}
```
## Questions: 
 1. What is the purpose of the `FormatCrypto` import and how is it used in this code?
   - The smart developer might ask what the `FormatCrypto` component does and how it is used in this code. The answer is that `FormatCrypto` is imported from a file and used to format cryptocurrency values.
   
2. What is the purpose of the `CryptoCurrencyIcon` import and how is it used in this code?
   - The smart developer might ask what the `CryptoCurrencyIcon` component does and how it is used in this code. The answer is that `CryptoCurrencyIcon` is imported from a file and used to display an icon for a specific cryptocurrency based on its address.
   
3. What are the available props for the `FormatCryptoCurrency` component and what do they do?
   - The smart developer might ask what props are available for the `FormatCryptoCurrency` component and what they do. The answer is that `FormatCryptoCurrency` accepts props for `amount`, `address`, `maximumFractionDigits`, `logoHeight`, `textStyle`, `css`, and `decimals`, which are used to format and display cryptocurrency values with an optional icon.