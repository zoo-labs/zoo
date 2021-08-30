// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "./uniswapv2/interfaces/IUniswapV2Factory.sol";
import "./uniswapv2/interfaces/IUniswapV2Factory.sol";
import "./uniswapv2/interfaces/IUniswapV2Router01.sol";
import { IERC20Uniswap } from "./uniswapv2/interfaces/IERC20.sol";

contract Savage {
    IERC20Uniswap B;
    IERC20Uniswap T;
    address LP;
    address PF;
    address PR;
    uint256 A;
    uint256 M;

    constructor(address b, address t, address lp, address pf, address pr, uint256 a, uint256 m) {
        B = IERC20Uniswap(b);
        T = IERC20Uniswap(t);
        LP = address(lp);
        PF = address(pf);
        PR = address(pr);
        A = a;
        M = m;
    }

    function savage() public {
        uint amountIn = A * 10 ** T.decimals();

        require(T.transferFrom(msg.sender, address(this), amountIn), 'transferFrom failed');
        require(T.approve(address(PR), amountIn), 'approve failed');

        address[] memory path = new address[](2);
        path[0] = address(T);
        path[1] = address(B);

        // function swapExactTokensForTokens()
        IUniswapV2Router01(PR).swapExactTokensForETH(amountIn, M, path, msg.sender, block.timestamp);
    }
}
