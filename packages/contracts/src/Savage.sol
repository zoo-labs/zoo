// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "./uniswapv2/interfaces/IUniswapV2Factory.sol";
import "./uniswapv2/interfaces/IUniswapV2Factory.sol";
import "./uniswapv2/interfaces/IUniswapV2Router01.sol";
import { IERC20Uniswap } from "./uniswapv2/interfaces/IERC20.sol";

contract Savage {
    IERC20Uniswap B; // token 1
    IERC20Uniswap Z; // token 2
    address PF;      // factory
    address PR;      // router
    uint256 A;       // amount
    uint256 M;       // min amount out

    // Setup swap
    constructor(address b, address z, address pf, address pr, uint256 a, uint256 m) {
        B = IERC20Uniswap(b);
        Z = IERC20Uniswap(z);
        PF = address(pf);
        PR = address(pr);
        A = a;
        M = m;
    }

    // Execute swap
    function swap() public {
        uint amountIn = A * 10 ** Z.decimals();

        require(Z.transferFrom(msg.sender, address(this), amountIn), 'transferFrom failed');
        require(Z.approve(address(PR), amountIn), 'approve failed');

        address[] memory path = new address[](2);
        path[0] = address(Z);
        path[1] = address(B);

        // function swapExactTokensForTokens()
        IUniswapV2Router01(PR).swapExactTokensForETH(amountIn, M, path, msg.sender, block.timestamp);
    }
}
