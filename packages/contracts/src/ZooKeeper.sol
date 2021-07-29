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
import { Animal, Hybrid, Egg, Type, Token } from "./ZooTypes.sol";

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
        ZooDrop memory drop;

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
    function buyEgg(uint256 dropID) public returns (uint256) {
        ZooDrop drop = ZooDrop(drops[dropID]);

        require(
            token.balanceOf(msg.sender) >= drop.eggPrice(),
            "Not Enough ZOO Tokens to purchase Egg"
        );

        require(
            drop.currentSupply() > 0,
            "There are no more Eggs that can be purchased"
        );

        console.log("Transferring tokens from user");
        token.transferFrom(msg.sender, address(this), drop.eggPrice());

        console.log("Buying Egg from drop");
        (string memory tokenURI, string memory metadataURI) = drop.buyEgg();
        ZooMedia.MediaData memory data;

        // Token metadata
        data.tokenURI = tokenURI;
        data.metadataURI = metadataURI;
        data.contentHash = keccak256(
            abi.encodePacked(tokenURI, block.number, msg.sender)
        );
        data.metadataHash = keccak256(
            abi.encodePacked(metadataURI, block.number, msg.sender)
        );

        // Bid Shares for profit sharing
        IMarket.BidShares memory bidShares;
        bidShares.prevOwner = Decimal.D256(0);
        bidShares.creator = Decimal.D256(10 * (10**18));
        bidShares.owner = Decimal.D256(90 * (10**18));

        // Mint token
        console.log("mint");
        media.mintFor(msg.sender, data, bidShares);
        console.log("minted");

        uint256 tokenID = media.getRecentToken(msg.sender);
        console.log("tokenID", tokenID);

        // Update bidshares
        console.log("Set bidshares for", tokenID);
        market.setBidShares(tokenID, bidShares);
        console.log("Bid shares updated");

        // Save egg state
        Egg memory egg;
        egg.timestamp = block.timestamp;
        eggs[tokenID] = egg;
        types[tokenID] = Type.BASE_EGG;

        emit BuyEgg(msg.sender, tokenID);
        return tokenID;
    }

    // Burn egg and randomly return an animal NFT
    function hatchEgg(uint256 dropID, uint256 eggID)
        public
        returns (uint256)
    {
        console.log('hatchEgg:this', address(this));
        console.log('hatchEgg:msg.sender', msg.sender);
        ZooDrop drop = ZooDrop(drops[dropID]);

        // need to check the hatch time delay

        //  grab egg struct
        Egg memory egg = eggs[eggID];
        Type eggType = types[eggID];

        // Burn egg (it's hatching)
        media.burn(eggID);
        emit Burn(msg.sender, eggID);

        // A new animal is born!
        ZooMedia.MediaData memory data;
        Type _type;
        string memory name;
        string memory tokenURI;
        string memory metadataURI;

        // Randomly select a new animal or hybrid
        uint256 randomNumber = unsafeRandom();

        Token memory token;

        if (Type.BASE_EGG == eggType) {
            // Normal egg
            token._type = Type.BASE_ANIMAL;
            name = pickAnimal(randomNumber);
            animal = drop.getAnimal(name);
            data.tokenURI = animal.tokenURI;
            data.metadataURI = animal.metadataURI;
        } else {
            // Hybrid egg
            token._type = Type.HYBRID_ANIMAL;
            // require(egg.timestamp > egg.timestamp.add(4 hours), "Must wait 4 hours for hybrid eggs to hatch.");

            Hybrid[2] memory possible = [
                drop.getHybridByParents(egg.parentA, egg.parentB),
                drop.getHybridByParents(egg.parentB, egg.parentA)
            ];

            // pick array index 0 or 1 depending on the rarity
            name = possible[randomNumber % 2].name;
            hybrid = drop.getHybrid(name);
            data.tokenURI = hybrid.tokenURI;
            data.metadataURI = hybrid.metadataURI;
        }

        console.log("hatched:", name);

        // Save hash of token and metadata
        data.contentHash = keccak256(
            abi.encodePacked(
                data.tokenURI,
                block.number,
                msg.sender
            )
        );
        data.metadataHash = keccak256(
            abi.encodePacked(
                data.metadataURI,
                block.number,
                msg.sender
            )
        );

        // Zoo takes 10%
        IMarket.BidShares memory bidShares;
        bidShares.prevOwner = Decimal.D256(0);
        bidShares.creator = Decimal.D256(10 * (10**18));
        bidShares.owner = Decimal.D256(90 * (10**18));

        // Mint token
        console.log("Mintend NFT, tokenURI: ", data.tokenURI, data.metadataURI);
        media.mintFor(msg.sender, data, bidShares); // this time not an egg but an animal

        uint256 tokenID = media.getRecentToken(msg.sender);
        console.log("TokenID", tokenID);

        // Save NFT state
        animalDOB[tokenID] = block.number;
        types[tokenID] = _type;

        if (_type == Type.BASE_ANIMAL) {
            animals[tokenID] = animal;
        } else {
            hybrids[tokenID] = hybrid;
        }

        // Set profit sharing
        console.log("Set bid shares");
        market.setBidShares(tokenID, bidShares);

        // type of NFT
        emit Hatch(msg.sender, tokenID);
        return tokenID;
    }

    // Breed two animals and create a hybrid egg
    function breedAnimal(
        uint256 dropID,
        uint256 tokenIDA,
        uint256 tokenIDB
    ) public onlyExistingToken(tokenIDA) onlyExistingToken(tokenIDB) returns (uint256) {
        require(tokenIDA != tokenIDB);
        require(
            breedReady(tokenIDA) && breedReady(tokenIDB),
            "Must wait for cooldown to finish."
        );

        // Get drop
        ZooDrop drop = ZooDrop(drops[dropID]);

        // require non hybrids
        Type animalTypeA = types[tokenIDA];
        Type animalTypeB = types[tokenIDB];
        require(
            animalTypeA == Type.BASE_ANIMAL && animalTypeB == Type.BASE_ANIMAL,
            "Hybrid animals cannot breed."
        );

        Animal memory animalA = animals[tokenIDA];
        Animal memory animalB = animals[tokenIDB];

        // need to figure out the delay
        // require(now.sub(checkBreedDelay()) <= 0)

        ZooMedia.MediaData memory data;
        (string memory tokenURI, string memory metadataURI) = drop.getHybridEgg();
        data.tokenURI = tokenURI;
        data.metadataURI = metadataURI;
        data.contentHash = keccak256(
            abi.encodePacked(tokenURI, block.number, msg.sender)
        );
        data.metadataHash = keccak256(
            abi.encodePacked(metadataURI, block.number, msg.sender)
        );

        // Setup profit sharing
        IMarket.BidShares memory bidShares;
        bidShares.prevOwner = Decimal.D256(0);
        bidShares.creator = Decimal.D256(10 * (10**18));
        bidShares.owner = Decimal.D256(90 * (10**18));

        // Mint egg
        media.mintFor(msg.sender, data, bidShares);
        uint256 eggID = media.getRecentToken(msg.sender);

        // Save new egg
        Egg memory egg;
        egg.parentA = animalA.name;
        egg.parentB = animalB.name;
        egg.timestamp = block.timestamp;
        eggs[eggID] = egg;
        types[eggID] = Type.HYBRID_EGG;

        // Update breeding state
        breedCount[tokenIDA]++;
        breedCount[tokenIDB]++;
        breedTimestamp[tokenIDA] = block.timestamp;
        breedTimestamp[tokenIDB] = block.timestamp;

        emit Breed(msg.sender, tokenIDA, tokenIDB, eggID);
        return eggID;
    }

    // Freeing an animal burns the animal NFT and returns the ZOO to the owner
    function freeAnimal(uint256 tokenID) public returns (uint256 yield) {
        Token memory token = tokens[tokenID];
        ZooDrop drop = drops[token.dropID];

        require(drop.animalExists(token.name), "Non-existing animal");

        // Burn the token
        media.burn(token.ID);
        delete tokens[token.ID];
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

    // Temporary random function
    function unsafeRandom() private view returns (uint256) {
        uint256 randomNumber = uint256(
            keccak256(
                abi.encodePacked(block.number, msg.sender, block.timestamp)
            )
        ) % 1000;
        return randomNumber;
    }

    // Chooses animal based on random number generated from(0-999)
    // TODO: Use Drop data
    function pickAnimal(uint256 random) public pure returns (string memory) {
        if (random < 550) {
            uint256 choice = random % 4;
            if (choice == 0) {
                return "Pug";
            } else if (choice == 1) {
                return "Butterfly";
            } else if (choice == 2) {
                return "Kitten";
            } else if (choice == 3) {
                return "Turtle";
            }
        } else if (random > 550 && random < 860) {
            uint256 choice = random % 4;
            if (choice == 0) {
                return "Penguin";
            } else if (choice == 1) {
                return "Duckling";
            } else if (choice == 2) {
                return "Orca";
            } else if (choice == 3) {
                return "Elk";
            }
        } else if (random > 860 && random < 985) {
            uint256 choice = random % 4;
            if (choice == 0) {
                return "Panda";
            } else if (choice == 1) {
                return "Gorilla";
            } else if (choice == 2) {
                return "Elephant";
            } else if (choice == 3) {
                return "Lion";
            }
        } else if (random > 985 && random < 995) {
            uint256 choice = random % 2;
            if (choice == 0) {
                return "Bear";
            } else if (choice == 1) {
                return "Shark";
            }
        } else if (random > 995 && random < 1000) {
            uint256 choice = random % 2;
            if (choice == 0) {
                return "Blobfish";
            } else if (choice == 1) {
                return "Naked Mole Rat";
            }
        }

        return "";
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
