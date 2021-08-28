// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <=0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

// ZFRM Token is a goverance token which is issued by the Farm contract
// contract as a reward for staking LP tokens
contract FarmTokenV2 is ERC20Upgradeable, OwnableUpgradeable {
    function initialize() public initializer  {
        __ERC20_init("FarmTokenV2", "ZFRM");
        __Ownable_init();
    }

    /// @notice Creates `_amount` token to `_to`. Must only be called by the owner.
    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }
}
