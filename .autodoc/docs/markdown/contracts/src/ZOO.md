[View code on GitHub](zoo-labs/zoo/blob/master/contracts/src/ZOO.sol)

The `ZOO` contract is an ERC20 token that inherits from several OpenZeppelin contracts. It includes functionality for pausing and unpausing transfers, blacklisting addresses, minting tokens, and conducting an airdrop. 

The contract is initialized with the name and symbol of the token, and the `DEFAULT_ADMIN_ROLE` is assigned to the contract deployer. The `configure` function can be called by the contract owner to set the `bridge` address, which is used to mint and burn tokens. The `blacklistAddress` function can be used by the contract owner to add an address to the blacklist, preventing them from transferring tokens. The `isBlacklisted` function can be used to check if an address is blacklisted. 

The `_transferAllowed` function is an internal function that checks if an address is blacklisted before allowing a transfer. The `transfer` and `transferFrom` functions override the OpenZeppelin implementations to include this check. 

The `bridgeMint` and `bridgeBurn` functions can only be called by the `bridge` address and are used to mint and burn tokens on behalf of the bridge. 

The `pause` and `unpause` functions can be used by the contract owner to pause and unpause transfers. 

The `mint` function can be used by the contract owner to mint tokens. It can only be called once, and only before the `airdropDone` function is called. 

The `airdrop` function can be used by the contract owner to conduct an airdrop. It takes two arrays as arguments: an array of addresses to receive tokens, and an array of token amounts to distribute. The function checks that the arrays are of equal length, that no addresses are zero, and that no zero amounts are being transferred. It then mints tokens to each address in the array. The `airdropDone` function can be called by the contract owner to prevent the `airdrop` function from being called again. 

Overall, this contract provides basic ERC20 functionality with additional features for pausing transfers, blacklisting addresses, minting and burning tokens through a bridge, and conducting an airdrop.
## Questions: 
 1. What is the purpose of the `BLACKLIST` constant and how is it used in the contract?
- The `BLACKLIST` constant is a bytes32 hash used to identify the role of blacklisted addresses. It is used to restrict transfers to and from blacklisted addresses.

2. What is the purpose of the `bridge` variable and how is it used in the contract?
- The `bridge` variable is an address that is used to identify the bridge contract that can mint and burn tokens on behalf of this contract. It is used in the `onlyBridge` modifier and the `bridgeMint` and `bridgeBurn` functions.

3. What is the purpose of the `airdropEnd` variable and how is it used in the contract?
- The `airdropEnd` variable is a timestamp that is used to track the end of the airdrop period. It is used to prevent the airdrop from being run again after it has been completed, as well as to disable the `airdrop` function once the airdrop period has ended.