// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";
import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { ZooDrop } from "./ZooDrop.sol";
import { ZooMedia } from "./ZooMedia.sol";
import { ZooMarket } from "./ZooMarket.sol";
import { ZooToken } from "./ZooToken.sol";
import { IMarket } from "./interfaces/IMarket.sol";
import { Decimal } from "./Decimal.sol";
import { Animal, Hybrid, Egg, Rarity, Type, Token } from "./ZooTypes.sol";

import "./console.sol";


contract ZooKeeper is Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private dropIDs;

    uint256 blocksPerDay = 28800;
    uint256 public hybridHatchTime = 36 hours;

    // Declare an Event
    event AddDrop(uint256 indexed dropID, address indexed dropAddress);
    event BuyEgg(address indexed from, uint256 indexed tokenID);
    event Hatch(address indexed from, uint256 indexed tokenID);
    event Burn(address indexed from, uint256 indexed tokenID);
    event FreeAnimal(
        address indexed from,
        uint256 indexed tokenID,
        uint256 indexed yield
    );
    event Breed(
        address indexed from,
        uint256 parentA,
        uint256 parentB,
        uint256 indexed eggID
    );

    // Mapping of ID to NFT
    mapping(uint256 => Token) public tokens;

    // Mapping of ID to Drop
    mapping(uint256 => ZooDrop) public drops;

    // Mapping of Token ID to custom name
    mapping(uint256 => string) public names;

    // Price to set name of Token
    uint256 public namePrice;

    // External contracts
    ZooMarket public market;
    ZooMedia public media;
    IERC20 public token;

    modifier onlyExistingToken(uint256 tokenID) {
        require(media.tokenExists(tokenID), "ZooKeeper: nonexistent token");
        _;
    }

    constructor(address _market, address _media, address _token) {
        market = ZooMarket(_market);
        media = ZooMedia(_media);
        token = IERC20(_token);
    }

    // Add a new Drop
    function addDrop(address _address, string memory _name, uint256 totalSupply, uint256 eggPrice) public returns (uint256, address) {
        ZooDrop drop;

        // Add pre-existing contract or create new ZooDrop
        if (_address == address(0)) {
            drop = new ZooDrop(_name, totalSupply, eggPrice);
        } else {
            drop = ZooDrop(_address);
        }

        // Get a new ID
        dropIDs.increment();
        uint256 id = dropIDs.current();

        // Save drop
        drops[id] = drop;
        emit AddDrop(id, drop);
        return (id, address(drop));
    }

    // Accept ZOO and return Egg NFT
    function buyEgg(uint256 dropID) public returns (Token memory) {
        ZooDrop drop = ZooDrop(drops[dropID]);

        require(
            token.balanceOf(msg.sender) >= drop.eggPrice(),
            "Not Enough ZOO Tokens to purchase Egg"
        );

        require(
            drop.currentSupply() > 0,
            "There are no more Eggs that can be purchased"
        );

        // Transfer funds
        token.transferFrom(msg.sender, address(this), drop.eggPrice());

        // Instantiate a new token for Egg
        Token memory egg = drop.newEgg();

        // Mint Egg Token
        media.mintToken(msg.sender, egg);
        market.setBidShares(egg.id, egg.bidShares);
        tokens[egg.id] = egg;

        emit BuyEgg(msg.sender, egg.id);

        return egg;
    }

    // Burn egg and randomly return an animal NFT
    function hatchEgg(uint256 dropID, uint256 eggID) public returns (Token memory) {
        ZooDrop drop = ZooDrop(drops[dropID]);

        // need to check the hatch time delay

        //  grab egg struct
        Token memory egg = tokens[eggID];

        // A new animal is born!
        Token memory token;

        // Get random animal or hybrid from drop
        if (egg.kind == Type.BASE_EGG) {
            token = drop.getRandomAnimal(unsafeRandom());
        } else {
            token = drop.getRandomHybrid(unsafeRandom(), egg.parentA.name, egg.parentB.name);
        }

        // Burn egg aka it's hatching...
        media.burn(eggID);
        delete tokens[eggID];
        emit Burn(msg.sender, eggID);

        // Mint Animal or Hybrid Token
        media.mintToken(msg.sender, token);
        market.setBidShares(token.id, token.bidShares);
        tokens[token.id] = token;

        emit Hatch(msg.sender, token.id);

        return token;
    }

    // Breed two animals and create a hybrid egg
    function breedAnimal(
        uint256 dropID,
        uint256 parentA,
        uint256 parentB
    ) public onlyExistingToken(parentA) onlyExistingToken(parentB) returns (Token memory) {
        require(parentA != parentB);
        require(
            breedReady(parentA) && breedReady(parentB),
            "Must wait for cooldown to finish."
        );

        // Get drop and animals
        ZooDrop drop = ZooDrop(drops[dropID]);
        Token memory animalA = tokens[parentA];
        Token memory animalB = tokens[parentB];

        // Require non hybrids
        require(
            (animalA.kind == Type.BASE_ANIMAL) && (animalB.kind == Type.BASE_ANIMAL),
            "Hybrid animals cannot breed."
        );

        // Update breeding delay for each parent
        updateBreedDelays(animalA, animalB);

        // New Hybrid Egg
        Token memory egg = drop.newHybridEgg(parentA, parentB);

        // Mint token and update bidShares
        media.mintToken(msg.sender, egg);
        market.setBidShares(egg.id, egg.bidShares);
        tokens[egg.id] = egg;

        emit Breed(msg.sender, animalA.id, animalB.id, egg.id);

        return egg;
    }

    // Freeing an animal burns the animal NFT and returns the ZOO to the owner
    function freeAnimal(uint256 tokenID) public returns (uint256 yield) {
        Token memory token = tokens[tokenID];
        ZooDrop drop = drops[token.dropID];

        // Burn the token
        media.burn(token.id);
        delete tokens[token.id];
        emit Burn(msg.sender, token);

        // How long we HODLing?
        uint256 blockAge = block.number - token.birthday;
        uint256 daysOld = blockAge.div(blocksPerDay);

        // Calculate yield
        yield = daysOld.mul(token.rarity.yield);

        // Transfer yield
        token.transfer(msg.sender, yield);

        emit FreeAnimal(msg.sender, tokenID, yield);
    }

    // Set price for buying a name
    function setNamePrice(uint256 price) public onlyOwner {
        namePrice = price;
    }

    // Add a name for given NFT
    function buyName(uint256 tokenID, string memory _name) public {
        require(
            token.balanceOf(msg.sender) >= namePrice,
            "Not Enough ZOO Tokens to purchase Name"
        );

        console.log("Transfer ZOO from sender to this contract");
        token.transferFrom(msg.sender, address(this), namePrice);
        names[tokenID] = _name;
    }

    // Return the highest of two rarities
    function highestRarity(Rarity memory rarityA, Rarity memory rarityB) returns (Rarity memory) {
        if (rarityA.probability < rarityB.probability) {
            return rarityA;
        }
        return rarityB;
    }

    // Temporary random function
    function unsafeRandom() private view returns (uint256) {
        uint256 randomNumber = uint256(
            keccak256(
                abi.encodePacked(block.number, msg.sender, block.timestamp)
            )
        ) % 1000;
        return randomNumber;
    }

    // Update breed delays
    function updateBreedDelays(Token memory animalA, Token memory animalB) private {
        animalA.breedCount++;
        animalA.breedTimestamp = block.timestamp;
        tokens[animalA.id] = animalA;

        animalB.breedCount++;
        animalB.breedTimestamp = block.timestamp;
        tokens[animalB.id] = animalB;
    }

    // Get next timestamp token can be bred
    function breedNext(uint256 tokenID) public view returns (uint256) {
        Token memory token = tokens[tokenID];
        return token.breedTimestamp + (token.breedCount * 1 days);
    }

    // Check whether token is ready to breed again
    function breedReady(uint256 tokenID) public view returns (bool) {
        Token memory token = tokens[tokenID];

        // Never bred? Lets go
        if (token.BreedCount == 0) {
            return true;
        }

        // If current timestamp is greater than the next breed time, lets go
        if (block.timestamp > breedNext(tokenID)) {
            return true;
        }

        // Not ready
        return false;
    }
}
