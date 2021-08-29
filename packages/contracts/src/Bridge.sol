// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Swappable } from "./interfaces/Swappable.sol";
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";

contract Bridge is Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private tokenIDs;
    Counters.Counter private txIDs;

    // Supported token types
    enum Type {
        ERC20,
        ERC721
    }

    // Supported tokens
    struct Token {
        Type kind;
        uint256 id;
        uint chainID;
        address tokenAddress;
        bool enabled;
    }

    // Unique Swap Tx
    struct Transaction {
        uint256 id;
        Token tokenA;
        Token tokenB;
        address sender;
        address recipient;
        uint256 amount;
        uint256 nonce;
    }

    // Supported tokens
    mapping (uint256 => Token) public tokens;

    // Transactions
    mapping (uint256 => Transaction) public transactions;

    // Events
    event AddToken(uint chainID, address tokenAddress);
    event RemoveToken(uint chainID, address tokenAddress);
    event Mint(uint chainID, address tokenAddress, address to, uint256 amount);
    event Burn(uint chainID, address tokenAddress, address from, uint256 amount);
    event Swap(uint256 tokenA, uint256 tokenB, uint256 txID, address sender, address recipient, uint256 amount);

    constructor() { }

    // Hash chain, address to a unique identifier
    function tokenID(Token memory token) internal returns (uint256) {
        return uint256(keccak256(abi.encodePacked(token.chainID, token.tokenAddress)));
    }

    // Hash TX to unique identifier
    function txID(Transaction memory t) internal returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, t.id, t.tokenA.chainID, t.tokenB.chainID, t.sender, t.recipient, t.amount, t.nonce)));
    }

    // Check if chain ID and token is supported
    function enabledToken(Token memory token) internal returns (bool) {
        return tokens[tokenID(token)].enabled;
    }

    // Compare chain ID to local chain ID
    function currentChain(uint _chainID) internal returns (bool) {
        return keccak256(abi.encodePacked(block.chainid)) == keccak256(abi.encodePacked(_chainID));
    }

    // Enable swapping a new ERC20 token
    function setToken(Token memory token) public onlyOwner {
        require(token.tokenAddress != address(0), "Token address must not be zero");
        require(token.chainID != 0, "Chain ID must not be zero");

        // Update token configuration save ID
        token.id = tokenID(token);
        tokens[token.id] = token;

        if (enabledToken(token)) {
            emit AddToken(token.chainID, token.tokenAddress);
        } else {
            emit RemoveToken(token.chainID, token.tokenAddress);
        }
    }

    // Swap from tokenA to tokenB on another chain. User initiated function, relies on msg.sender
    function swap(Token memory tokenA, Token memory tokenB, address recipient, uint256 amount, uint256 nonce) public {
        require(!currentChain(tokenB.chainID), "We cannot swap to ourselves");
        require(enabledToken(tokenA), "Swap from token not enabled");
        require(enabledToken(tokenB), "Swap to token not enabled");
        require(amount > 0, "Amount must be greater than zero");
        require(recipient != address(0), "Recipient should not be zero address");

        // Save transaction
        Transaction memory t = Transaction(0, tokenA, tokenB, msg.sender, recipient, amount, nonce);
        t.id = txID(t);
        transactions[t.id] = t;

        // Emit all swap related events so listening contracts can mint on other side
        emit Swap(tokenID(tokenA), tokenID(tokenB), t.id, msg.sender, recipient, amount);

        // Burn
        if (currentChain(tokenA.chainID)) {
            burn(tokenA, msg.sender, amount);
        } else {
            mint(tokenB, msg.sender, amount);
        }
    }

    // Internal function to burn token + emit event
    function burn(Token memory token, address _from, uint256 _amount) internal {
        require(currentChain(token.chainID), "Token not on chain");
        tokens[tokenID(token)].burnFrom(_from, _amount);
        emit Burn(_from, _amount);
    }

    // Mint new tokens for user after burn + swap on alternate chain
    function mint(Token memory token, address _to, uint256 _amount) public onlyOwner {
        require(_to != address(0));
        require(_amount > 0);
        require(currentChain(token.chainID), "Token not on chain");
        tokens[tokenID].mint(_to, _amount);
        emit Mint(_to, _amount);
    }
}
