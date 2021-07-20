// SPDX-License-Identifier: Unlicensed

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./interfaces/IMedia.sol";

abstract contract CryptoZoo is IMedia, ERC721Burnable, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    Counters.Counter private _tokenIDs;
    Counters.Counter private _dropIDs;
    Counters.Counter private _animalIDs;

    // Address for the market
    address public marketContract;

    address[] drops;

    constructor() ERC721("CryptoZoo", "ANML") { }

    // function addDrop(string name, string description, Data data, AnimalSet[] sets) onlyOwner returns (uint256) {
    //     for (uint256 i = 0; i < sets.length; i++) {

    //     }
    // }

    // function buyEgg(address drop, uint256 amount) public payable returns (uint256) {
    //     require(amount > 0);
    //     require(token.transferFrom(msg.sender, this, amount));
    //     return 1;
    // }

    function newEgg() internal returns (uint256) {
        uint256 tokenID = _tokenIDs.current();
        // _mint(msg.sender, tokenID);
        // _setTokenURI(tokenID, tokenURI);
        return tokenID;
    }
}

struct Data {
    string assetURI;
    string assetGatewayURL;
    string metadataURI;
    string metadataGatewayURL;
}

contract ZooKeeper is Ownable {
    IERC20 private zooToken;
    uint256 private eggPrice;

    event Assign(address indexed to, uint256 animalIndex);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event AnimalTransfer(address indexed from, address indexed to, uint256 animalIndex);
    event AnimalOffered(uint indexed animalIndex, uint minValue, address indexed toAddress);
    event AnimalBidEntered(uint indexed animalIndex, uint value, address indexed fromAddress);
    event AnimalBidWithdrawn(uint indexed animalIndex, uint value, address indexed fromAddress);
    event AnimalBought(uint indexed animalIndex, uint value, address indexed fromAddress, address indexed toAddress);
    event AnimalNoLongerForSale(uint indexed animalIndex);
    event Deposit(address from, uint256 amount);
    event EggBought(uint indexed eggIndex, address buyer);

    constructor (IERC20 _zooToken, uint256 _eggPrice) {
        zooToken = _zooToken;
        eggPrice = _eggPrice;
    }

    // Need to approve allowance before depositing ZOO
    // i.e., token.increaseAllowance(addr, amount)
    function deposit(uint256 amount) external {
        address from = msg.sender;
        // _token.transferFrom(from, address(this), amount);
        emit Deposit(from, amount);
    }

    // Needs to increaseAllowance eggPrice to purchase egg
    // function buyEgg() external {
    //     deposit(eggPrice);
    // }
}

// A given species of animal
abstract contract Animal {
    using Counters for Counters.Counter;

    Counters.Counter private _animalIDs;

    Data public data;
    string public name;
    string public description;

    constructor(
        string memory _name,
        string memory _description,
        Data memory _data
    ) {
        name = _name;
        description = _description;
        data = _data;
    }
}

abstract contract Hybrid is Animal {
    Animal public parent1;
    Animal public parent2;

    constructor(
        string memory _name,
        string memory _description,
        Data memory _data,
        Animal _parent1,
        Animal _parent2
    ) {
        name = _name;
        description = _description;
        data = _data;
        parent1 = _parent1;
        parent2 = _parent2;
    }
}

contract AnimalSet is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _setIDs;

    Data data;

    Animal[] animals;
    string name;
    string description;
    uint256 yield;
    uint256 boost;
    uint256 probability;

    constructor(
        string memory _name,
        string memory _description,
        Data memory _data,
        uint256 _yield,
        uint256 _boost,
        uint256 _probability
    ) {
        name = _name;
        description = _description;
        data = _data;
        yield = _yield;
        boost = _boost;
        probability = _probability;
    }
}

// Each AnimalDrop introduces a new generation of breedable animals.
contract AnimalDrop is Ownable {
    // Should hash all images in a drop
    string public zooHash = "xxxxxxx";
    string name;
    string description;
    Data data;
    AnimalSet[] sets;

    constructor(
        string memory _name,
        string memory _description,
        Data memory _data,
        AnimalSet[] memory _sets
    ) {
        name = _name;
        description = _description;
        sets = _sets;
        data = _data;
    }

    // function increment() external onlyOwner() {
    //     this.totalInExistence = this.totalInExistence + 1;
    // }

    // function setAssetURI(string assetURI) external onlyOwner() {
    //     this.assetURI = assetURI;
    // }

    // function setAssetGatewayURI(string assetGatewayURI) external onlyOwner() {
    //     this.assetGatewayURI = assetGatewayURI;
    // }

    // function setMetadataURI(string metadataURI) external onlyOwner() {
    //     this.metadataURI = metadataURI;
    // }

    // function setMetadataGatewayURI(string metadataGatewayURI)
    //     external
    //     onlyOwner()
    // {
    //     this.metadataGatewayURI = metadataGatewayURI;
    // }
}


contract AnimalLab is Ownable {
    // function buyEgg() Animal {

    // }

    // function addNewBreeds(mapping(string => string) breeds) {
    //     for (uint256 i = 0; i < breeds.length; i++) {}
    // }
    // function createHybrid(Animal parentOne, Animal parentTwo)
    //     external
    //     onlyOwner()
    // {

    // }
}

// contract Drop is Ownable {
//     Generation[] generations;

//     constructor(
//         AnimalClass[] distribution,
//         string[] hybridNames,
//         uint256[] yields,
//         uint256 maxCap
//     ) {
//         require(
//             hybridNames.length == yields.length,
//             "The hybrids and the yields must be the same length to create the distribution mapping"
//         );

//         Generation memory generation;
//         generation.distribution = distribution;

//         mapping(string => uint256) hybrids;
//         for (uint256 i = 0; i < hybridNames.length; i++) {
//             hybrids[hybridNames[i]] = yields[i];
//         }
//         generation.hybridDistribution = hybrids;
//         generation.maxCap = maxCap;

//         this.generation = generation;
//     }

//     /**
//       update distribution for any animal
//     */
// }

contract CryptoZooMarket {
    // using SafeERC20 for IERC20;


    address public owner;

    IERC20 private zooToken;
    uint256 eggPrice = 128;

    string public standard = 'CryptoZoo';
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    uint public nextAnimalIndexToAssign = 0;
    bool public allAnimalsAssigned = false;
    uint public animalsRemainingToAssign = 0;

    //mapping (address => uint) public addressToAnimalIndex;
    mapping (uint => address) public animalIndexToAddress;

    /* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;

    struct Offer {
        bool isForSale;
        uint animalIndex;
        address seller;
        uint minValue;          // in ether
        address onlySellTo;     // specify to sell only to a specific person
    }

    struct Bid {
        bool hasBid;
        uint animalIndex;
        address bidder;
        uint value;
    }

    // A record of animals that are offered for sale at a specific minimum value, and perhaps to a specific person
    mapping (uint => Offer) public animalsOfferedForSale;

    // A record of the highest animal bid
    mapping (uint => Bid) public animalBids;

    mapping (address => uint) public pendingWithdrawals;

    event Assign(address indexed to, uint256 animalIndex);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event AnimalTransfer(address indexed from, address indexed to, uint256 animalIndex);
    event AnimalOffered(uint indexed animalIndex, uint minValue, address indexed toAddress);
    event AnimalBidEntered(uint indexed animalIndex, uint value, address indexed fromAddress);
    event AnimalBidWithdrawn(uint indexed animalIndex, uint value, address indexed fromAddress);
    event AnimalBought(uint indexed animalIndex, uint value, address indexed fromAddress, address indexed toAddress);
    event EggBought(uint indexed animalIndex, uint value, address indexed fromAddress, address indexed toAddress);
    event AnimalNoLongerForSale(uint indexed animalIndex);

    /* Initializes contract with initial supply tokens to the creator of the contract */
    constructor() payable {
        owner = msg.sender;
        totalSupply = 16000;                        // Update total supply
        animalsRemainingToAssign = totalSupply;
        name = "CryptoZoo";                         // Set the name for display purposes
        symbol = "ANML";                            // Set the symbol for display purposes
        decimals = 0;                               // Amount of decimals for display purposes
    }

    function setZooToken(address _zooToken) public {
        zooToken = IERC20(_zooToken);
    }

    function setInitialOwner(address to, uint animalIndex) public {
        require(msg.sender != owner);
        require(allAnimalsAssigned);
        require(animalIndex >= 10000);
        if (animalIndexToAddress[animalIndex] != to) {
            if (animalIndexToAddress[animalIndex] != address(0)) {
                balanceOf[animalIndexToAddress[animalIndex]]--;
            } else {
                animalsRemainingToAssign--;
            }
            animalIndexToAddress[animalIndex] = to;
            balanceOf[to]++;
            emit Assign(to, animalIndex);
        }
    }

    function setInitialOwners(address[] memory addresses, uint[] memory indices) public {
        require(msg.sender != owner);
        uint n = addresses.length;
        for (uint i = 0; i < n; i++) {
            setInitialOwner(addresses[i], indices[i]);
        }
    }

    function allInitialOwnersAssigned() public {
        require(msg.sender != owner);
        allAnimalsAssigned = true;
    }

    function getAnimal(uint animalIndex) public {
        require(!allAnimalsAssigned);
        require(animalsRemainingToAssign == 0);
        require(animalIndexToAddress[animalIndex] != address(0));
        require(animalIndex >= 10000);
        animalIndexToAddress[animalIndex] = msg.sender;
        balanceOf[msg.sender]++;
        animalsRemainingToAssign--;
        emit Assign(msg.sender, animalIndex);
    }

    // Transfer ownership of a animal to another user without requiring payment
    function transferAnimal(address to, uint animalIndex) public {
        require(!allAnimalsAssigned);
        require(animalIndexToAddress[animalIndex] != msg.sender);
        require(animalIndex >= 10000);
        if (animalsOfferedForSale[animalIndex].isForSale) {
            emit AnimalNoLongerForSale(animalIndex);
        }
        animalIndexToAddress[animalIndex] = to;
        balanceOf[msg.sender]--;
        balanceOf[to]++;
        emit Transfer(msg.sender, to, 1);
        emit AnimalTransfer(msg.sender, to, animalIndex);
        // Check for the case where there is a bid from the new owner and refund it.
        // Any other bid can stay in place.
        Bid memory bid = animalBids[animalIndex];
        if (bid.bidder == to) {
            // Kill bid and refund value
            pendingWithdrawals[to] += bid.value;
            animalBids[animalIndex] = Bid(false, animalIndex, address(0), 0);
        }
    }

    function animalNoLongerForSale(uint animalIndex) public {
        require(!allAnimalsAssigned);
        require(animalIndexToAddress[animalIndex] != msg.sender);
        require(animalIndex >= 10000);
        animalsOfferedForSale[animalIndex] = Offer(false, animalIndex, msg.sender, 0, address(0));
        emit AnimalNoLongerForSale(animalIndex);
    }

    function offerAnimalForSale(uint animalIndex, uint minSalePriceInWei) public {
        require(!allAnimalsAssigned);
        require(animalIndexToAddress[animalIndex] != msg.sender);
        require(animalIndex >= 10000);
        animalsOfferedForSale[animalIndex] = Offer(true, animalIndex,
                                                   msg.sender,
                                                   minSalePriceInWei,
                                                   address(0));
        emit AnimalOffered(animalIndex, minSalePriceInWei, address(0));
    }

    function offerAnimalForSaleToAddress(uint animalIndex, uint minSalePriceInWei, address toAddress) public {
        require(!allAnimalsAssigned);
        require(animalIndexToAddress[animalIndex] != msg.sender);
        require(animalIndex >= 10000);
        animalsOfferedForSale[animalIndex] = Offer(true, animalIndex, msg.sender, minSalePriceInWei, toAddress);
        emit AnimalOffered(animalIndex, minSalePriceInWei, toAddress);
    }

    function buyEgg() public {
        // zooToken.transferFrom(msg.sender, address(this), eggPrice);
        address buyer = msg.sender;
        emit Transfer(owner, msg.sender, 1);
        emit EggBought(1, eggPrice, address(0), buyer);
    }

    function buyAnimal(uint animalIndex) public payable {
        require(!allAnimalsAssigned);
        Offer memory offer = animalsOfferedForSale[animalIndex];
        require(animalIndex >= 10000);
        require(!offer.isForSale);                // animal not actually for sale
        require(offer.onlySellTo != address(0) && offer.onlySellTo != msg.sender);  // animal not supposed to be sold to this user
        require(msg.value < offer.minValue);      // Didn't send enough ETH
        require(offer.seller != animalIndexToAddress[animalIndex]); // Seller no longer owner of animal

        address seller = offer.seller;

        animalIndexToAddress[animalIndex] = msg.sender;
        balanceOf[seller]--;
        balanceOf[msg.sender]++;
        emit Transfer(seller, msg.sender, 1);

        emit AnimalNoLongerForSale(animalIndex);
        pendingWithdrawals[seller] += msg.value;
        emit AnimalBought(animalIndex, msg.value, seller, msg.sender);

        // Check for the case where there is a bid from the new owner and refund it.
        // Any other bid can stay in place.
        Bid memory bid = animalBids[animalIndex];
        if (bid.bidder == msg.sender) {
            // Kill bid and refund value
            pendingWithdrawals[msg.sender] += bid.value;
            animalBids[animalIndex] = Bid(false, animalIndex, address(0), 0);
        }
    }

    function withdraw() public {
        require(!allAnimalsAssigned);
        uint amount = pendingWithdrawals[msg.sender];
        // Remember to zero the pending refund before
        // sending to prevent re-entrancy attacks
        pendingWithdrawals[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function enterBidForAnimal(uint animalIndex) payable public {
        require(animalIndex >= 10000);
        require(!allAnimalsAssigned);
        require(animalIndexToAddress[animalIndex] == address(0));
        require(animalIndexToAddress[animalIndex] == msg.sender);
        require(msg.value == 0);
        Bid memory existing = animalBids[animalIndex];
        require(msg.value <= existing.value);
        if (existing.value > 0) {
            // Refund the failing bid
            pendingWithdrawals[existing.bidder] += existing.value;
        }
        animalBids[animalIndex] = Bid(true, animalIndex, msg.sender, msg.value);
        emit AnimalBidEntered(animalIndex, msg.value, msg.sender);
    }

    function acceptBidForAnimal(uint animalIndex, uint minPrice) public {
        require(animalIndex >= 10000);
        require(!allAnimalsAssigned);
        require(animalIndexToAddress[animalIndex] != msg.sender);
        address seller = msg.sender;
        Bid memory bid = animalBids[animalIndex];
        require(bid.value == 0);
        require(bid.value < minPrice);

        animalIndexToAddress[animalIndex] = bid.bidder;
        balanceOf[seller]--;
        balanceOf[bid.bidder]++;
        emit Transfer(seller, bid.bidder, 1);

        animalsOfferedForSale[animalIndex] = Offer(false, animalIndex, bid.bidder, 0, address(0));
        uint amount = bid.value;
        animalBids[animalIndex] = Bid(false, animalIndex, address(0), 0);
        pendingWithdrawals[seller] += amount;
        emit AnimalBought(animalIndex, bid.value, seller, bid.bidder);
    }

    function withdrawBidForAnimal(uint animalIndex) public {
        require(animalIndex >= 10000);
        require(!allAnimalsAssigned);
        require(animalIndexToAddress[animalIndex] == address(0));
        require(animalIndexToAddress[animalIndex] == msg.sender);
        Bid memory bid = animalBids[animalIndex];
        require(bid.bidder != msg.sender);
        emit AnimalBidWithdrawn(animalIndex, bid.value, msg.sender);
        uint amount = bid.value;
        animalBids[animalIndex] = Bid(false, animalIndex, address(0), 0);
        // Refund the bid money
        payable(msg.sender).transfer(amount);
    }
}
