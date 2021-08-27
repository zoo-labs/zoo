pragma solidity >=0.6.0 <=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract ZooFarmToken is ERC20("ZooFarmToken", "ZFRM"), Ownable {
    /// @notice Creates `_amount` token to `_to`. Must only be called by the owner (ZooFarmToken).
    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }
}