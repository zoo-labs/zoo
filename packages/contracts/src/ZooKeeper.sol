// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;
pragma experimental ABIEncoderV2;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";
import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IZoo } from "./interfaces/IZoo.sol";
import { IDrop } from "./interfaces/IDrop.sol";
import { IMarket } from "./interfaces/IMarket.sol";
import { IMedia } from "./interfaces/IMedia.sol";

import "./console.sol";


contract ZooKeeper is Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private dropIDs;

    // Declare an Event
    event AddDrop(address indexed dropAddress, string title, uint256 eggSupply);
    event BuyEgg(address indexed from, uint256 indexed tokenID);
    event Hatch(address indexed from, uint256 eggID, string indexed name, uint256 indexed tokenID);
    event Breed(address indexed from, uint256 parentA, uint256 parentB, uint256 indexed tokenID);
    event Mint(address indexed from, uint256 indexed tokenID);
    event Burn(address indexed from, uint256 indexed tokenID);
    event Free(address indexed from, uint256 indexed tokenID, uint256 indexed yield);

    // Mapping of Address to Drop ID
    mapping(uint256 => address) public drops;

    // Mapping of ID to Address
    mapping(address=> uint256) public dropAddresses;

    // Mapping of ID to NFT
    mapping(uint256 => IZoo.Token) public tokens;

    // Mapping of ID to NFT
    mapping(uint256 => uint256) public eggsMinted;

    // Price to set name of Token
    uint256 public namePrice;

    // External contracts
    IMarket public market;
    IMedia public media;
    IERC20 public zoo;

    function configure(address _market, address _media, address _zoo) public onlyOwner {
        market = IMarket(_market);
        media = IMedia(_media);
        zoo = IERC20(_zoo);
    }

    function setDrop(address dropAddress) public returns (uint256) {
        require(dropAddresses[dropAddress] == 0, "Drop already added");

        IDrop drop = IDrop(dropAddress);

        dropIDs.increment();
        uint256 dropID = dropIDs.current();
        drops[dropID] = dropAddress;
        dropAddresses[dropAddress] = dropID;
        emit AddDrop(dropAddress, drop.title(), drop.eggSupply());
        return dropID;
    }

    // Issue a new token to owner
    function mint(address owner, IZoo.Token memory token) private returns (IZoo.Token memory) {
        console.log("mint", owner, token.name);
        token = media.mintToken(owner, token);
        market.setBidShares(token.id, token.bidShares);
        tokens[token.id] = token;
        emit Mint(owner, token.id);
        return token;
    }

    // Burn token owned by owner
    function burn(address owner, uint256 tokenID) private {
        console.log("burn", owner, tokenID);
        media.burnToken(owner, tokenID);
        // delete tokens[tokenID];
        emit Burn(owner, tokenID);
    }

    // Accept ZOO and return Egg NFT
    function buyEggs(uint256 dropID, uint256 quantity) public {
        console.log('buyEggs', dropID, quantity);
        for (uint8 i=0; i<quantity; i++) {
            buyEgg(dropID);
        }
    }

    // Accept ZOO and return Egg NFT
    function buyEgg(uint256 dropID) public returns (IZoo.Token memory) {
        console.log('buyEgg', dropID);

        // Check egg price
        IDrop drop = IDrop(drops[dropID]);
        require(zoo.balanceOf(msg.sender) >= drop.eggPrice(), "ZK: Not Enough ZOO to purchase Egg");

        // Transfer funds
        console.log('zoo.transferFrom', msg.sender, address(this),drop.eggPrice());
        zoo.transferFrom(msg.sender, address(this), drop.eggPrice());

        // Get Egg from this drop
        IZoo.Token memory egg = drop.newEgg();

        // Mint Egg Token
        egg = mint(msg.sender, egg);
        console.log('minted egg', egg.id);

        emit BuyEgg(msg.sender, egg.id);

        return egg;
    }

    // Burn egg and randomly return an animal NFT
    function hatchEgg(uint256 dropID, uint256 eggID) public returns (IZoo.Token memory) {
        console.log("hatchEgg", dropID, eggID);

        require(media.tokenExists(eggID), "Egg is burned or does not exist");

        // Get animal for given Egg
        IZoo.Token memory animal = getAnimal(dropID, eggID);
        animal.meta.eggID = eggID;
        animal.meta.dropID = dropID;
        console.log("animal", animal.name);

        // ...it's hatching!
        animal = mint(msg.sender, animal);
        console.log('minted animal', animal.id, eggID);

        // bye egg
        burn(msg.sender, eggID);
        console.log('burned', eggID);

        emit Hatch(msg.sender, eggID, animal.name, animal.id);
        return animal;
    }


    // Breed two animals and create a hybrid egg
    function breedAnimals(uint256 dropID, uint256 tokenA, uint256 tokenB) public canBreed(tokenA, tokenB) returns (IZoo.Token memory) {
        console.log('breedAnimals', dropID, tokenA, tokenB);

        IZoo.Token memory egg = IDrop(drops[dropID]).newHybridEgg(
            IZoo.Parents({
                animalA: tokens[tokenA].name,
                animalB: tokens[tokenB].name,
                tokenA: tokenA,
                tokenB: tokenB
            })
        );

        // Update breeding delay for each parent
        updateBreedDelays(tokenA, tokenB);

        egg = mint(msg.sender, egg);
        emit Breed(msg.sender, tokenA, tokenB, egg.id);
        return egg;
    }

    // Freeing an animal burns the animal NFT and returns the ZOO to the owner
    function freeAnimal(uint256 tokenID) public returns (uint256 yield) {
        console.log('freeAnimal', tokenID);

        IZoo.Token memory token = tokens[tokenID];

        // Burn the token
        burn(msg.sender, tokenID);

        // How long did we HODL?
        uint256 blockAge = block.number - token.birthday;
        uint256 daysOld = blockAge.div(28800);

        // Calculate yield
        yield = daysOld.mul(token.rarity.yield);
        console.log(block.number, token.birthday, yield);

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

        IZoo.Token memory token = tokens[tokenID];
        token.customName = customName;
        tokens[tokenID] = token;
    }

    // Temporary random function
    function unsafeRandom() private view returns (uint256) {
        uint256 randomNumber = uint256(
            keccak256(
                abi.encodePacked(block.number, msg.sender, block.timestamp)
            )
        ) % 10000;
        return randomNumber;
    }

    // Ensure base animal
    function isBaseAnimal(uint256 tokenID) private view returns (bool) {
        return tokens[tokenID].kind == IZoo.Type.BASE_ANIMAL;
    }

    // Ensure animals can breed
    modifier canBreed(uint256 parentA, uint256 parentB) {
        console.log("canBreed", parentA, parentB);

        require(media.tokenExists(parentA) && media.tokenExists(parentB), "Non-existent token");
        require(keccak256(abi.encode(parentA)) != keccak256(abi.encode(parentB)),"Not able to breed with self" );
        require(breedReady(parentA) && breedReady(parentB), "Wait for cooldown to finish.");
        require(isBaseAnimal(parentA) && isBaseAnimal(parentB), "Only BASE_ANIMAL can breed.");
        _;
    }

    // Get a random base or hybrid animal based on a given egg
    function getAnimal(uint256 dropID, uint256 eggID) private view returns (IZoo.Token memory) {
        console.log('getAnimal', dropID, eggID);

        // Get Egg
        IZoo.Token memory egg = tokens[eggID];

        // Get random animal or hybrid from Drop
        if (egg.kind == IZoo.Type.BASE_EGG) {
            console.log("getRandomAnimal", dropID, eggID);
            return IDrop(drops[dropID]).getRandomAnimal(unsafeRandom());
        } else {
            console.log("getRandomHybrid", dropID, eggID);
            return IDrop(drops[dropID]).getRandomHybrid(unsafeRandom(), egg.parents);
        }
    }

    // Update breed delays
    function updateBreedDelays(uint256 parentA, uint256 parentB) private {
        console.log('updateBreedDelays', parentA, parentB);

        tokens[parentA].breed.count++;
        tokens[parentB].breed.count++;
        tokens[parentA].breed.timestamp = block.timestamp;
        tokens[parentB].breed.timestamp = block.timestamp;
    }

    // Get next timestamp token can be bred
    function breedNext(uint256 tokenID) public view returns (uint256) {
        IZoo.Token memory token = tokens[tokenID];
        return token.breed.timestamp + (token.breed.count * 1 days);
    }

    // Check whether token is ready to breed again
    function breedReady(uint256 tokenID) public view returns (bool) {
        // Never bred? Lets go
        if (tokens[tokenID].breed.count == 0) {
            return true;
        }
        // If current timestamp is greater than the next breed time, lets go
        if (block.timestamp > breedNext(tokenID)) {
            return true;
        }

        // Not ready
        return false;
    }

    // Return total amount of ZOO in contract
    function zooSupply() public view onlyOwner returns (uint256) {
        return zoo.balanceOf(address(this));
    }

    // Enable owner to withdraw ZOO if necessary
    function zooWithdraw(address receiver, uint256 amount) public onlyOwner returns (bool) {
        return zoo.transferFrom(address(this), receiver, amount);
    }
}
