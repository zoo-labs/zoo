pragma solidity 0.8.4;

import "./ZooDrop.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract ZooMaster is Ownable {
    mapping (uint256 => address) _drops;

    // Should take drop configuration and add animals to ZOO
    function addDrop(uint256 _key, address _dropContract) public onlyOwner returns (bool) {
        // Enable new drop to mint it's set of animals
        _drops[_key] = _dropContract;
        return true;
    }

    function removeDrop(uint256 _key) public onlyOwner return (bool) {
        delete _drops[_key];
        return true;
    }
}