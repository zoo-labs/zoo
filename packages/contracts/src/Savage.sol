// SPDX-License-Identifier: MIT
pragma solidity =0.6.12;

import { UniswapV2Pair } from "./uniswapv2/UniswapV2Pair.sol";
import { IUniswapV2Factory } from "./uniswapv2/interfaces/IUniswapV2Factory.sol";
import { IUniswapV2Router01 } from "./uniswapv2/interfaces/IUniswapV2Router01.sol";
import { TransferHelper } from "./uniswapv2/libraries/TransferHelper.sol";
import { IERC20 } from "./uniswapv2/interfaces/IERC20.sol";
import { SafeMath } from "./uniswapv2/libraries/SafeMath.sol";

import "./console.sol";

contract Savage {
    using SafeMath  for uint;
    using SafeMath  for uint8;

    IERC20 A;                 // from A
    IERC20 B;                 // to B
    IERC20 C;                 // to C

    IUniswapV2Router01 Router; // router
    IUniswapV2Factory Factory; // factory

    address a;
    address b;
    address c;
    address router;
    address factory;
    address owner;

    event SwapTokens(uint256 amountIn, uint256 amountOutMin);
    event Pair(address pair, address b, address c);
    event Liquidity(address b, uint256 bAmount, address c, uint256 cAmount);

    modifier onlyOwner() {
        require(owner == msg.sender, "Savage: Only owner has access");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    // Configure tokens, factory, router
    function configure(address _a, address _b, address _c, address _factory, address _router) public onlyOwner {
        a = _a;
        b = _b;
        c = _c;
        factory = _factory;
        router = _router;
        A = IERC20(_a);
        B = IERC20(_b);
        C = IERC20(_c);
        Factory = IUniswapV2Factory(_factory);
        Router  = IUniswapV2Router01(_router);
    }

    // Get path A -> B
    function getPath() private view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = a;
        path[1] = b;
        return path;
    }

    // Swap token A for token B
    function swapTokens(uint amountIn, uint amountOutMin) public {

        // Calculate deadline
        uint deadline = block.timestamp + 15;

        console.log('swapTokens', amountIn, amountOutMin);
        console.log('balanceOf msg.sender', A.balanceOf(msg.sender));
        console.log('balanceOf savage', A.balanceOf(address(this)));
        console.log('balanceOf router', A.balanceOf(router));

        console.log('safeTransferFrom', msg.sender, amountIn);
        TransferHelper.safeTransferFrom(a, msg.sender, address(this), amountIn);

        console.log('balanceOf msg.sender', A.balanceOf(msg.sender));
        console.log('balanceOf savage', A.balanceOf(address(this)));
        console.log('balanceOf router', A.balanceOf(router));

        console.log('safeApprove', router, amountIn);
        TransferHelper.safeApprove(a, router, amountIn);

        Router.swapExactTokensForTokens(
            amountIn,
            0, // amountOutMin: we can skip computing this number because the math is tested
            getPath(),
            address(this),
            deadline
        );

        console.log('Z balanceOf msg.sender', A.balanceOf(msg.sender));
        console.log('Z balanceOf savage', A.balanceOf(address(this)));
        console.log('Z balanceOf router', A.balanceOf(router));
        console.log('B balanceOf msg.sender', B.balanceOf(msg.sender));
        console.log('B balanceOf savage', B.balanceOf(address(this)));
        console.log('B balanceOf router', B.balanceOf(router));

        emit SwapTokens(amountIn, amountOutMin);
    }

    // Launch new pair and add liquidity
    function launchPool() public onlyOwner returns (address) {
        console.log('launchPool');

        Factory.createPair(b, c);
        console.log('Factory.createPair', b, c);

        address pair = Factory.getPair(b, c);

        console.log('Factory.getPair', pair);
        emit Pair(pair, b, c);

        uint amountB = B.balanceOf(address(this));
        uint amountC = C.balanceOf(address(this));
        uint deadline = block.timestamp + 15;

        Router.addLiquidity(
            b,
            c,
            amountB, amountC,
            100, 100,
            msg.sender,
            deadline
        );

        console.log('Router.addLiquidity', amountB, amountC);
        emit Liquidity(b, amountB, c, amountC);
        return pair;
    }

    // Show current balances
    function balanceZOO() public view returns (uint256) {
        return A.balanceOf(address(this));
    }

    function balanceBNB() public view returns (uint256) {
        return B.balanceOf(address(this));
    }

    function balanceZOOV2() public view returns (uint256) {
        return C.balanceOf(address(this));
    }

    function zooAddress() public view returns (address) {
        return a;
    }

    function bnbAddress() public view returns (address) {
        return b;
    }

    function zooV2Address() public view returns (address) {
        return c;
    }

    function factoryAddress() public view returns (address) {
        return factory;
    }

    function routerAddress() public view returns (address) {
        return router;
    }

    // Helper to show the init code for the UniswapV2Pair
    function getInitHash() public view returns(bytes32) {
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
        console.logBytes32(keccak256(abi.encodePacked(bytecode)));
        return keccak256(abi.encodePacked(bytecode));
    }
}
