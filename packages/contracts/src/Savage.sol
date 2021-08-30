// SPDX-License-Identifier: MIT
pragma solidity =0.6.12;

import { UniswapV2Pair } from "./uniswapv2/UniswapV2Pair.sol";
import { IUniswapV2Router01 } from "./uniswapv2/interfaces/IUniswapV2Router01.sol";
import { TransferHelper } from "./uniswapv2/libraries/TransferHelper.sol";
import { IERC20 } from "./uniswapv2/interfaces/IERC20.sol";
import { SafeMath } from "./uniswapv2/libraries/SafeMath.sol";

import "./console.sol";

contract Savage {
    using SafeMath  for uint;
    using SafeMath  for uint8;

    IERC20  Z;                 // from Z
    IERC20  B;                 // to B
    IUniswapV2Router01 Router; // router

    address z;
    address b;
    address router;

    event SwapTokens(uint256 amountIn, uint256 amountOutMin);

    // Setup swap
    constructor(address _z, address _b, address _router) public {
        Z = IERC20(_z);
        B = IERC20(_b);
        Router = IUniswapV2Router01(_router);

        z = _z;
        b = _b;
        router = _router;
    }

    // get path Z -> B
    function getPath() private view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = z;
        path[1] = b;
        return path;
    }


    function approve() public {
        console.log('approve');
        TransferHelper.safeApprove(z, router, Z.balanceOf(msg.sender));
    }

    // Maybe works
    function swapTokens(uint amountIn, uint amountOutMin) public {
        console.log('swapTokens', amountIn, amountOutMin);

        // Calculate deadline
        uint deadline = block.timestamp + 15;

        console.log('balanceOf msg.sender', Z.balanceOf(msg.sender));
        console.log('balanceOf savage', Z.balanceOf(address(this)));
        console.log('balanceOf router', Z.balanceOf(router));

        console.log('safeTransferFrom', msg.sender, amountIn);
        TransferHelper.safeTransferFrom(z, msg.sender, address(this), amountIn);

        console.log('balanceOf msg.sender', Z.balanceOf(msg.sender));
        console.log('balanceOf savage', Z.balanceOf(address(this)));
        console.log('balanceOf router', Z.balanceOf(router));

        console.log('safeApprove', router, amountIn);
        TransferHelper.safeApprove(z, router, amountIn);

        Router.swapExactTokensForTokens(
            amountIn,
            0, // amountOutMin: we can skip computing this number because the math is tested
            getPath(),
            address(this),
            deadline
        );

        console.log('Z balanceOf msg.sender', Z.balanceOf(msg.sender));
        console.log('Z balanceOf savage', Z.balanceOf(address(this)));
        console.log('Z balanceOf router', Z.balanceOf(router));
        console.log('B balanceOf msg.sender', B.balanceOf(msg.sender));
        console.log('B balanceOf savage', B.balanceOf(address(this)));
        console.log('B balanceOf router', B.balanceOf(router));

        emit SwapTokens(amountIn, amountOutMin);
    }

    // Helper to show the init code for the UniswapV2Pair
    function getInitHash() public view returns(bytes32) {
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
        console.logBytes32(keccak256(abi.encodePacked(bytecode)));
        return keccak256(abi.encodePacked(bytecode));
    }
}
