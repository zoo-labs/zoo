// SPDX-License-Identifier: MIT
pragma solidity =0.6.12;

import { IUniswapV2Router01 } from "./uniswapv2/interfaces/IUniswapV2Router01.sol";
import { IERC20 } from "./uniswapv2/interfaces/IERC20.sol";
import { SafeMath } from "./uniswapv2/libraries/SafeMath.sol";

import "./console.sol";

contract Savage {
    using SafeMath  for uint;
    using SafeMath  for uint8;

    IERC20  B; // token 1
    IERC20  Z; // token 2
    address F; // factory
    address R; // router
    uint256 A; // amount
    uint256 M; // min amount out

    // Setup swap
    constructor(address b, address z, address f, address r, uint256 a, uint256 m) public {
        B = IERC20(b);
        Z = IERC20(z);
        F = address(f);
        R = address(r);
        A = a;
        M = m;
    }

    // Execute swap
    function swap() public {
        uint a = Z.decimals().mul(A).mul(10);

        require(Z.transferFrom(msg.sender, address(this), a), 'transferFrom failed');
        require(Z.approve(address(R), a), 'approve failed');

        address[] memory path = new address[](2);
        path[0] = address(B);
        path[1] = address(Z);

        IUniswapV2Router01(R).swapExactTokensForTokens(a, M, path, msg.sender, block.timestamp);
    }
}
