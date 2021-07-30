// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;
pragma experimental ABIEncoderV2;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";
import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { ZooDrop } from "./ZooDrop.sol";
import { ZooMedia } from "./ZooMedia.sol";
import { ZooMarket } from "./ZooMarket.sol";
import { Pair, Type, Token } from "./ZooTypes.sol";


contract ZooKeeper is Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private dropIDs;

    // Declare an Event
    event AddDrop(address indexed dropAddress, string title, uint256 eggSupply);
    event BuyEgg(address indexed from, uint256 indexed eggID);
    event Hatch(address indexed from, uint256 indexed eggID);
    event Breed(address indexed from, uint256 indexed eggID);
    event Mint(address indexed from, uint256 indexed tokenID);
    event Burn(address indexed from, uint256 indexed tokenID);
    event Free(address indexed from, uint256 indexed tokenID, uint256 indexed yield);

    // Mapping of ID to Drop
    mapping(uint256 => ZooDrop) public drops;

    // Mapping of ID to NFT
    mapping(uint256 => Token) public tokens;

    // Price to set name of Token
    uint256 public namePrice;

    // External contracts
    ZooMarket public market;
    ZooMedia public media;
    IERC20 public zoo;

    constructor(address _market, address _media, address _zoo) {
        market = ZooMarket(_market);
        media = ZooMedia(_media);
        zoo = IERC20(_zoo);
    }

    // Save new drop
    function setDrop(ZooDrop drop) private {
        dropIDs.increment();
        uint256 dropID = dropIDs.current();
        drops[dropID] = drop;
        emit AddDrop(address(drop), drop.title(), drop.eggSupply());
    }

    // Add pre-existing contract or create new ZooDrop.
    function addDrop(string memory title, uint256 eggSupply, address dropAddress) public returns (uint256, address) {
        if (dropAddress == address(0)) {
            setDrop(new ZooDrop(title, eggSupply)); // new Drop
        } else {
            setDrop(ZooDrop(dropAddress)); // Pre-launched
        }
    }

    // Issue a new token to owner
    function mint(address owner, Token memory token) private {
        media.mintToken(owner, token);
        market.setBidShares(token.id, token.bidShares);
        tokens[token.id] = token;
        emit Mint(owner, token.id);
    }

    // Burn token owned by owner
    function burn(address owner, uint256 tokenID) private {
        media.burnToken(owner, tokenID);
        delete tokens[tokenID];
        emit Burn(msg.sender, tokenID);
    }

    // Accept ZOO and return Egg NFT
    function buyEgg(uint256 dropID) public {
        ZooDrop drop = ZooDrop(drops[dropID]);
        require(zoo.balanceOf(msg.sender) >= drop.eggPrice(), "ZK: Not Enough ZOO to purchase Egg");
        require(drop.currentSupply() > 0, "ZK: There are no more Eggs that can be purchased");

        {
            // Transfer funds
            zoo.transferFrom(msg.sender, address(this), drop.eggPrice());

            // Instantiate a new token for Egg
            Token memory egg = drop.newEgg();

            // Mint Egg Token
            mint(msg.sender, egg);
            emit BuyEgg(msg.sender, egg.id);
        }
    }

    // Burn egg and randomly return an animal NFT
    function hatchEgg(uint256 dropID, uint256 eggID) public {

        {
            //  Grab egg
            Token memory egg = tokens[eggID];
            ZooDrop drop = ZooDrop(drops[dropID]);

            // A new animal is born!
            Token memory token;

            // Get random animal or hybrid from drop
            if (egg.kind == Type.BASE_EGG) {
                token = drop.getRandomAnimal(unsafeRandom());
            } else {
                token = drop.getRandomHybrid(unsafeRandom(), egg.parents);
            }

            // Burn egg aka it's hatching...
            burn(msg.sender, eggID);

            // Mint Animal or Hybrid Token
            mint(msg.sender, token);

            emit Hatch(msg.sender, token.id);
        }
    }

    modifier canBreed(Pair memory pair) {
        // require(media.tokenExists(pair.tokenA) && media.tokenExists(pair.tokenB), "ZK: nonexistent token");
        // require(keccak256(abi.encode(pair.tokenA)) != keccak256(abi.encode(pair.tokenB)));
        // require(breedReady(pair.tokenA), "ZK: Wait for cooldown to finish.");
        // require(breedReady(pair.tokenB), "ZK: Wait for cooldown to finish.");

        // Require non hybrids
        // require(
        //     (parents.tokenA.kind == Type.BASE_ANIMAL) && (parents.tokenB.kind == Type.BASE_ANIMAL),
        //     "Hybrid animals cannot breed."
        // );

        _;
    }

    // Breed two animals and create a hybrid egg
    function breedAnimals(uint256 dropID, Pair memory parents) public canBreed(parents) returns (Token memory) {
        ZooDrop drop = ZooDrop(drops[dropID]);

        // Update breeding delay for each parent
        updateBreedDelays(parents);

        // New Hybrid Egg
        Token memory egg = drop.newHybridEgg(parents);
        mint(msg.sender, egg);
        emit Breed(msg.sender, egg.id);
        return egg;
    }

    // Freeing an animal burns the animal NFT and returns the ZOO to the owner
    function freeAnimal(uint256 tokenID) public returns (uint256 yield) {
        Token memory token = tokens[tokenID];

        // Burn the token
        burn(msg.sender, tokenID);

        // How long did we HODL?
        uint256 blockAge = block.number - token.birthday;
        uint256 daysOld = blockAge.div(28800);

        // Calculate yield
        yield = daysOld.mul(token.rarity.yield);

        // Transfer yield
        zoo.transfer(msg.sender, yield);
        emit Free(msg.sender, tokenID, yield);
    }

    // Set price for buying a name
    function setNamePrice(uint256 price) public onlyOwner {
        namePrice = price;
    }

    // Buy a custom name for your NFT
    function buyName(uint256 tokenID, string memory customName) public {
        require(
            zoo.balanceOf(msg.sender) < namePrice,
            "ZK: Not enough ZOO to purchase Name"
        );

        zoo.transferFrom(msg.sender, address(this), namePrice);

        Token memory token = tokens[tokenID];
        token.customName = customName;
        tokens[tokenID] = token;
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
    function updateBreedDelays(Pair memory parents) private {
        tokens[parents.tokenA].breedCount++;
        tokens[parents.tokenB].breedCount++;
        tokens[parents.tokenA].timestamp = block.timestamp;
        tokens[parents.tokenB].timestamp = block.timestamp;
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
        if (token.breedCount == 0) {
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
