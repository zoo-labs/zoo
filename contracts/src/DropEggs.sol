// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IDrop } from "./interfaces/IDrop.sol";
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";
import { IKeeper } from "./interfaces/IKeeper.sol";

contract DropEggs is Ownable {
    using SafeMath for uint256;

    using Counters for Counters.Counter;
    uint256 randomLimit;
    Counters.Counter public whitelistedCount;

    uint256 zooKeeperDropId;

    uint256 maxEggForSublime;

    // Address of ZooKeeper contract
    address public keeperAddress;

    address public dropAddress;

    mapping(address => uint256) private _whitelistedAllowToMint;
    mapping(uint => address) private whitelisted;

    constructor() {
        zooKeeperDropId = 1;
        maxEggForSublime = 20;
        randomLimit = 3;
    }

    function configureDropAddress(address drop) public onlyOwner {
        dropAddress = drop;
    }

    function changeRandomLimit(uint256 limit) private {
        randomLimit = limit;
    }

    function configureKeeperAddress(address keeper) public onlyOwner {
        keeperAddress = keeper;
    }

    function addressAllowedToMint(address _address) public view returns (uint) {
        return _whitelistedAllowToMint[_address];
    }


    function changeZookeeperDropId(uint256 id) public onlyOwner {
        zooKeeperDropId = id;
    }


    function changeMaxEggForSublime(uint256 max) public onlyOwner {
        maxEggForSublime = max;
    }


    modifier airdropModifier (address[] memory addresses, uint256[] memory numAllowedToMint) {
        require(addresses.length > 0 && addresses.length == numAllowedToMint.length, "addresses and numAllowedToMint must be equal in length");
        uint256 i;
        uint totalNumberToMint;
        for (i = 0; i < addresses.length; i++) {
            require(addresses[i] != address(0), "An address is equal to 0x0"); // ensure no zero address
        }

        for (i = 0; i < numAllowedToMint.length; i++) {
            totalNumberToMint += numAllowedToMint[i];
        }
        require(totalNumberToMint != 0, "Amount to mint should not equal to zero");
        _;
    }


    function unsafeRandom() public view returns (uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.number, msg.sender, block.timestamp))) % randomLimit;
        return randomNumber;
    }

   function AirdropEggs(address[] memory addresses, uint256[] memory numAllowedToMint) airdropModifier(addresses, numAllowedToMint) public onlyOwner {
        uint256 _zooKeeperDropId = zooKeeperDropId;
        uint256 _maxEggForSublime = maxEggForSublime;

        for (uint256 i = 0; i < addresses.length; i++) {
            _whitelistedAllowToMint[addresses[i]] = numAllowedToMint[i];
            whitelistedCount.increment();
            whitelisted[whitelistedCount.current()] = addresses[i];
        }

        IKeeper keeper = IKeeper(keeperAddress);
        IDrop drop = IDrop(dropAddress);

        for (uint256 i = 0; i < addresses.length; i++){
            address buyerAddress = addresses[i];
                require(_whitelistedAllowToMint[buyerAddress] != 0, "Can not mint 0 token");
                if(_whitelistedAllowToMint[buyerAddress] >= _maxEggForSublime){
                    changeRandomLimit(4);
                }
                for (uint256 j = 0; j < _whitelistedAllowToMint[buyerAddress]; j++){
                    require(buyerAddress != address(0), "An address is equal to 0x0");
                    uint256 randomEgg = unsafeRandom();
                    uint256 Id;
                    IDrop.Egg memory egg;

                    if(randomEgg > 0) {
                        egg = drop.getEgg(randomEgg);
                        Id = randomEgg;
                    } else {
                        egg = drop.getEgg(1);
                        Id = 1;
                    }
                    require(egg.minted <= egg.supply, "STOCK_EXCEEDED");
                    keeper.dropEggs(Id, _zooKeeperDropId, buyerAddress);
                }
                changeRandomLimit(3);

        }

    }
}
