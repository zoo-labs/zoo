// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

import "./console.sol";

contract Chainlink is VRFConsumerBase {
    bytes32 internal keyHash;
    uint256 internal fee;

    mapping(bytes32 => uint256) public randomRequest;

    /**
     * Constructor inherits VRFConsumerBase
     *
     * Network: BSC Tesnet
     */
    constructor()
        VRFConsumerBase(
            0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
            0xa36085F69e2889c224210F603D836748e7dC0088  // LINK Token
        )
    {
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.2 * 10 ** 18; // 0.1 LINK (Varies by network)
    }

    /**
     * Requests randomness
     */
    function getRandomNumber() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        requestId =  requestRandomness(keyHash, fee);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomRequest[requestId] = randomness;
    }

    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}
