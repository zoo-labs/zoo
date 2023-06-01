[View code on GitHub](zoo-labs/zoo/blob/master/contracts/src/uniswapv2/libraries/Math.sol)

The code above is a Solidity library called "Math" that provides various math operations. The library contains two functions: "min" and "sqrt". 

The "min" function takes two unsigned integers as input and returns the smaller of the two. It does this by using a ternary operator to compare the two inputs and assign the smaller value to the variable "z". This function can be useful in situations where you need to find the minimum value of two inputs, such as when sorting or comparing values.

The "sqrt" function calculates the square root of an unsigned integer using the Babylonian method. This method involves repeatedly averaging the input with its inverse until the average converges to the square root. The function first checks if the input is greater than 3, and if so, initializes the variable "z" to the input and "x" to half the input plus one. It then enters a loop that continues until "x" is no longer less than "z". Within the loop, "z" is set to "x" and "x" is updated to the average of the input divided by "x" and "x". If the input is less than or equal to 3, the function sets "z" to 1 if the input is not 0. 

This library can be used in other Solidity contracts by importing it and calling its functions. For example, if a contract needs to find the minimum of two values, it can import the Math library and call the "min" function. Similarly, if a contract needs to calculate the square root of a value, it can import the Math library and call the "sqrt" function. 

Example usage of the "min" function:

```
import "./Math.sol";

contract MyContract {
    function findMin(uint x, uint y) public view returns (uint) {
        return Math.min(x, y);
    }
}
```

Example usage of the "sqrt" function:

```
import "./Math.sol";

contract MyContract {
    function calculateSqrt(uint y) public view returns (uint) {
        return Math.sqrt(y);
    }
}
```
## Questions: 
 1. What is the purpose of the `Math` library?
- The `Math` library is used for performing various math operations.

2. What is the `min` function used for?
- The `min` function is used to return the minimum value between two input parameters.

3. What method is used in the `sqrt` function?
- The `sqrt` function uses the Babylonian method to compute the square root of an input parameter.