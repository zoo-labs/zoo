// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "./uniswapv2/interfaces/IUniswapV2Factory.sol";
import "./uniswapv2/interfaces/IUniswapV2Factory.sol";
import "./uniswapv2/interfaces/IUniswapV2Router01.sol";
import { IERC20 } from "./uniswapv2/interfaces/IERC20.sol";

contract Savage {
    IERC20  B; // token 1
    IERC20  Z; // token 2
    address F; // factory
    address R; // router
    uint256 A; // amount
    uint256 M; // min amount out

    // Setup swap
    constructor(address b, address z, address f, address r, uint256 a, uint256 m) {
        B = IERC20(b);
        Z = IERC20(z);
        F = address(f);
        R = address(r);
        A = a;
        M = m;
    }

    // Execute swap
    function swap() public {
        uint a = A * 10 ** Z.decimals();

        require(Z.transferFrom(msg.sender, address(this), a), 'transferFrom failed');
        require(Z.approve(address(R), a), 'approve failed');

        address[] memory path = new address[](2);
        path[0] = address(B);
        path[1] = address(Z);

        IUniswapV2Router01(R).swapExactTokensForTokens(a, M, path, msg.sender, block.timestamp);
    }
}
