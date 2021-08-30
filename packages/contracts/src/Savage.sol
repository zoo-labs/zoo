// SPDX-License-Identifier: MIT
pragma solidity =0.6.12;

import { UniswapV2Pair } from "./uniswapv2/UniswapV2Pair.sol";
import { IUniswapV2Router01 } from "./uniswapv2/interfaces/IUniswapV2Router01.sol";
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

    event SwapTokens(uint256 amountIn, uint256 amountOutMin, bool success);

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

    // Maybe works
    function swapTokens(uint amountIn, uint amountOutMin) public {
        // Calculate deadline
        uint deadline = block.timestamp + 15;

        // transfer
        console.log('Z.approve', address(this), amountIn);
        require(Z.approve(router, amountIn), 'approve failed.');

        console.log('router.swapExactTokensForTokens', amountIn, amountOutMin, deadline);
        (bool success, bytes memory result) = router.delegatecall(
            abi.encodeWithSignature("swapExactTokensForTokens(uint256,uint256,address[],address,uint256)", amountIn, amountOutMin, getPath(), msg.sender, deadline)
        );
        console.log('SwapTokens', amountIn, amountOutMin, success);
        emit SwapTokens(amountIn, amountOutMin, success);
    }

    // Helper to show the init code for the UniswapV2Pair
    function getInitHash() public view returns(bytes32) {
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
        console.logBytes32(keccak256(abi.encodePacked(bytecode)));
        return keccak256(abi.encodePacked(bytecode));
    }
}
