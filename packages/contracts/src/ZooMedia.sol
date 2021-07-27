// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {Media} from "./Media.sol";
import "./ZooToken.sol";
import "./ZooDrop.sol";
import "./ERC721Burnable.sol";
import {IMarket} from "./interfaces/IMarket.sol";
import {Decimal} from "./Decimal.sol";
import "hardhat/console.sol";

// a instance for every egg or animal
contract ZooMedia is Media, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    uint256 public hybridHatchTime = 36 hours;

    uint256[] public coolDowns = [4 hours, 1 days, 3 days, 7 days, 30 days];

    enum TokenType {
        BASE_EGG,
        BASE_ANIMAL,
        HYBRID_EGG,
        HYBRID_ANIMAL
    }

    Counters.Counter private _dropIDs;

    //Declare an Event
    event AddDrop(uint256 indexed _dropID, address indexed _dropAddress);
    event BuyEgg(address indexed _from, uint256 indexed _tokenID);
    event Hatch(address indexed _from, uint256 indexed _tokenID);
    event Burn(address indexed _from, uint256 indexed _tokenID);
    event FreeAnimal(
        address indexed _from,
        uint256 indexed _tokenID,
        uint256 indexed _yield
    );
    event Breed(
        address indexed _from,
        uint256 _animalTokenId1,
        uint256 _animalTokenId2,
        uint256 _eggTokenId
    );

    struct Egg {
        string parent1;
        string parent2;
        uint256 eggCreationTime;
    }

    // Mapping of breed count for each address
    mapping(address => uint256) public breedCount;

    // Mapping of token ID to NFT type
    mapping(uint256 => TokenType) public types;

    // Mapping of token ID to Egg
    mapping(uint256 => Egg) public eggs;

    // Mapping of token ID to Animal
    mapping(uint256 => ZooDrop.Animal) public animals;

    // Mapping of token ID to Hybrids
    mapping(uint256 => ZooDrop.Hybrid) public hybrids;

    // Mapping of token ID to Hybrid Eggs
    // mapping (uint256 => HybridEgg) public hybridEggs;

    // Mapping of drop id to ZooDrop address
    mapping(uint256 => address) public drops;

    // mapping of all hatched animals DOB (as blocknumbers)
    mapping(uint256 => uint256) public animalDOB;

    mapping(address => uint256) public lastTimeBred;

    //Token address of the ZooToken
    ZooToken public token;

    constructor(
        string memory symbol,
        string memory name,
        address _market,
        address _token
    ) Media(symbol, name, _market) {
        token = ZooToken(_token);
    }

    function addDrop(
        string memory _name,
        uint256 _totalSupply,
        uint256 _eggPrice
    ) public onlyOwner returns (uint256, address) {
        _dropIDs.increment();
        uint256 dropID = _dropIDs.current();

        ZooDrop drop = new ZooDrop(_name, _totalSupply, _eggPrice);
        drops[dropID] = address(drop);

        emit AddDrop(dropID, address(drop));
        return (dropID, address(drop));
    }

    function setMetadataURI(
        uint256 dropID,
        string memory name,
        string memory _URI
    ) public onlyOwner {
        ZooDrop drop = ZooDrop(drops[dropID]);

        drop.setMetadataURI(name, _URI);
    }

    function setTokenURI(
        uint256 dropID,
        string memory name,
        string memory _URI
    ) public onlyOwner {
        ZooDrop drop = ZooDrop(drops[dropID]);

        drop.setTokenURI(name, _URI);
    }

    // Accept ZOO and return Egg NFT
    function buyEgg(uint256 dropId) public returns (uint256) {
        ZooDrop drop = ZooDrop(drops[dropId]);

        uint256 eggPrice = drop.getEggPrice();

        require(
            token.balanceOf(msg.sender) >= eggPrice,
            "Not Enough ZOO Tokens to purchase Egg"
        );
        require(
            drop.getCurrentSupply() > 0,
            "There are no more Eggs that can be purchased"
        );

        token.transferFrom(msg.sender, address(this), eggPrice);

        (string memory _tokenURI, string memory _metadataURI) = drop.buyEgg();
        Media.MediaData memory data;

        data.tokenURI = _tokenURI;
        data.metadataURI = _metadataURI;
        data.contentHash = keccak256(
            abi.encodePacked(_tokenURI, block.number, msg.sender)
        );
        data.metadataHash = keccak256(
            abi.encodePacked(_metadataURI, block.number, msg.sender)
        );

        IMarket.BidShares memory bidShare;

        // Get confirmation
        bidShare.prevOwner = Decimal.D256(0);
        bidShare.creator = Decimal.D256(10 * (10**18));
        bidShare.owner = Decimal.D256(90 * (10**18));

        mint(data, bidShare);
        uint256 tokenId = getRecentToken(msg.sender);

        Egg memory egg;

        egg.eggCreationTime = block.timestamp;

        eggs[tokenId] = egg;

        types[tokenId] = TokenType.BASE_EGG;

        emit BuyEgg(msg.sender, tokenId);
        return tokenId;
    }

    // Burn egg and randomly return an animal NFT
    function hatchEgg(uint256 dropId, uint256 tokenID)
        public
        returns (uint256)
    {
        ZooDrop drop = ZooDrop(drops[dropId]);

        // need to check the hatch time delay

        //  grab egg struct
        Egg memory egg = eggs[tokenID];
        TokenType eggType = types[tokenID];
        burn(tokenID);

        //  burn the eggToken(it's hatching)
        emit Burn(msg.sender, tokenID);

        // get the rarity for an animal
        uint256 rarity = unsafeRandom();

        Media.MediaData memory data;

        ZooDrop.Animal memory _animal;
        ZooDrop.Hybrid memory _hybrid;
        ZooDrop.Rarity memory _rarity;

        string memory hatchedAnimal;
        string memory name1;
        uint256 yield1;

        // if not hybrid
        if (uint256(TokenType.BASE_EGG) == uint256(eggType)) {
            hatchedAnimal = pickAnimal(rarity);
            (_animal.name, _animal.yield, _rarity) = drop.animals(
                hatchedAnimal
            );
            // _animal.rarity = ZooDrop.Rarity(_rarityName, _rarity);
        } else if (uint256(TokenType.HYBRID_EGG) == uint256(eggType)) {
            // if hybrid
            // require(egg.eggCreationTime > egg.eggCreationTime.add(4 hours), "Must wait 4 hours for hybrid eggs to hatch.");
            // pick array index 0 or 1 depending on the rarity
            (name1, yield1) = drop.hybrids(
                concatAnimalIds(egg.parent1, egg.parent2)
            );
            (string memory name2, uint256 yield2) = drop.hybrids(
                concatAnimalIds(egg.parent2, egg.parent1)
            );

            ZooDrop.Hybrid[2] memory possibleHybrids = [
                ZooDrop.Hybrid(name1, yield1),
                ZooDrop.Hybrid(name2, yield2)
            ];
            hatchedAnimal = possibleHybrids[rarity % 2].name;
            (name1, yield1) = drop.hybrids(hatchedAnimal);
            _hybrid.name = name1;
            _hybrid.yield = yield1;
        }

        if (uint256(TokenType.HYBRID_EGG) == uint256(eggType)) {
            // data.tokenURI = drop.tokenURI(hatchedAnimal);
            // data.metadataURI = drop.metadataURI(hatchedAnimal);
        }

        data.tokenURI = drop.tokenURI(hatchedAnimal);
        data.metadataURI = drop.metadataURI(hatchedAnimal);
        data.contentHash = keccak256(
            abi.encodePacked(
                drop.tokenURI(hatchedAnimal),
                block.number,
                msg.sender
            )
        );
        data.metadataHash = keccak256(
            abi.encodePacked(
                drop.metadataURI(hatchedAnimal),
                block.number,
                msg.sender
            )
        );

        IMarket.BidShares memory bidShare;
        bidShare.prevOwner = Decimal.D256(0);
        bidShare.creator = Decimal.D256(10 * (10**18));
        bidShare.owner = Decimal.D256(90 * (10**18));

        mint(data, bidShare); // this time not an egg but an animal

        uint256 tokenId = getRecentToken(msg.sender);

        if (bytes(_animal.name).length > 0) {
            _animal.rarity = _rarity;
            animals[tokenId] = _animal;
            types[tokenId] = TokenType.BASE_ANIMAL;
        } else {
            hybrids[tokenId] = _hybrid;
            types[tokenId] = TokenType.HYBRID_ANIMAL;
        }

        // animal DOB
        animalDOB[tokenId] = block.number;
        // type of NFT
        emit Hatch(msg.sender, tokenId);
        return tokenId;
    }

    // Breed two animals and create a hybrid egg
    function breedAnimal(
        uint256 dropId,
        uint256 _tokenIDA,
        uint256 _tokenIDB
    ) public onlyExistingToken(_tokenIDA) returns (uint256) {
        require(_tokenIDA != _tokenIDB);
        uint256 delay = getBreedingDelay(); 
        require(block.timestamp-lastTimeBred[msg.sender] > delay, "Must wait for cooldown to finish.");        

        ZooDrop drop = ZooDrop(drops[dropId]);

        // require non hybrids
        TokenType animalTypeA = types[_tokenIDA];
        TokenType animalTypeB = types[_tokenIDB];
        require(
            uint256(animalTypeA) == 1 && uint256(animalTypeB) == 1,
            "Hybrid animals cannot breed."
        );

        // need to figure out the delay
        // require(now.sub(checkBreedDelay()) <= 0)

        (string memory _tokenURI, string memory _metadataURI) = drop
        .getHybridEgg();
        Media.MediaData memory data;
        data.tokenURI = _tokenURI;
        data.metadataURI = _metadataURI;
        data.contentHash = keccak256(
            abi.encodePacked(_tokenURI, block.number, msg.sender)
        );
        data.metadataHash = keccak256(
            abi.encodePacked(_metadataURI, block.number, msg.sender)
        );

        IMarket.BidShares memory bidShare;

        // Get confirmation
        bidShare.prevOwner = Decimal.D256(0);
        bidShare.creator = Decimal.D256(10 * (10**18));
        bidShare.owner = Decimal.D256(90 * (10**18));
        mint(data, bidShare);
        uint256 eggTokenID = getRecentToken(msg.sender);

        Egg memory hybridEgg;
        hybridEgg.parent1 = animals[_tokenIDA].name;
        hybridEgg.parent2 = animals[_tokenIDB].name;
        hybridEgg.eggCreationTime = block.timestamp;



        eggs[eggTokenID] = hybridEgg;

        types[eggTokenID] = TokenType.HYBRID_EGG;
        lastTimeBred[msg.sender] = block.timestamp;
        breedCount[msg.sender]++;

        emit Breed(msg.sender, _tokenIDA, _tokenIDB, eggTokenID);

        return eggTokenID;
    }

    // Implemented prior to issue #30
    // Should burn animal and return yield
    function freeAnimal(uint256 _tokenID)
        public
        returns (bool)
    {
        require(
            bytes(hybrids[_tokenID].name).length > 0 ||
                bytes(animals[_tokenID].name).length > 0,
            "Non-existing animal"
        );

        // burn the token
        burn(_tokenID);
        emit Burn(msg.sender, _tokenID);

        uint256 blocks = block.number - animalDOB[_tokenID];
        uint256 avgBlocksDaily = 28800;
        uint256 age = blocks.div(avgBlocksDaily);
        uint256 dailyYield;
        uint256 percentage;

        if (bytes(hybrids[_tokenID].name).length > 0) {
            // calculate daily yield
            percentage = hybrids[_tokenID].yield;
            dailyYield = age.mul(percentage) + percentage;
            // transfer yield
            token.transfer(msg.sender, dailyYield);
            delete hybrids[_tokenID];
        } else {
            // calculate daily yield
            percentage = animals[_tokenID].yield;
            dailyYield = age.mul(percentage) + percentage;
            // transfer yield
            token.transfer(msg.sender, dailyYield);
            delete animals[_tokenID];
        }

        delete animalDOB[_tokenID];
        emit FreeAnimal(msg.sender, _tokenID, dailyYield);

        return true;
    }

    //   @Kimani will overwrite this
    // TEMP random function
    function unsafeRandom() private view returns (uint256) {
        uint256 randomNumber = uint256(
            keccak256(
                abi.encodePacked(block.number, msg.sender, block.timestamp)
            )
        ) % 1000;
        return randomNumber;
    }

    // take two animals and returns a bytes32 string of their names
    // to be used with ZooMedia.possib;ePairs to get the two possible hybrid pairs coming from the two base animals
    function concatAnimalIds(string memory a1, string memory a2)
        internal pure
        returns (string memory)
    {
        return string(abi.encodePacked(a1, a2));
    }

    // Chooses animal based on random number generated from(0-999), replace strings with ENUMS / data that
    // represents animal instead
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
        return "Pug";
    }

    /**
        Add animal for possibility of hatching for the drop
     */
    function addAnimal(
        uint256 dropID,
        string memory _animal,
        uint256 _yield,
        string memory _rarityName,
        uint256 _rarity,
        string memory _tokenURI,
        string memory _metadataURI
    ) public onlyOwner {
        ZooDrop drop = ZooDrop(drops[dropID]);
        drop.addAnimal(
            _animal,
            _yield,
            _rarityName,
            _rarity,
            _tokenURI,
            _metadataURI
        );
    }

    /**
        Add animal for possibility of hatching for the drop
     */
    function addHybrid(
        uint256 dropID,
        string memory _animal,
        string memory _base,
        string memory _secondary,
        uint256 yield,
        string memory _tokenURI,
        string memory _metadataURI
    ) public onlyOwner {
        ZooDrop drop = ZooDrop(drops[dropID]);
        drop.addHybrid(
            _animal,
            _base,
            _secondary,
            yield,
            _tokenURI,
            _metadataURI
        );
    }

    function getBreedingDelay() public returns (uint256) {
        uint256 count = breedCount[msg.sender];
        uint256 avgBlocksDaily = 28800;
        uint256 delay;

        if (count == 0) {
            delay = 0;
        } else if (count >= 5) {
            delay = coolDowns[coolDowns.length-1];
        } else {
            delay = coolDowns[count+1];
        }

        // if (count == 1) {
        //     delay = coolDowns30 * avgBlocksDaily;    
        // } else if (count == 4) {
        //     delay = 7 * avgBlocksDaily;
        // } else if (count == 3) {
        //     delay = 3 * avgBlocksDaily;
        // } else if (count == 3) {
        //     delay = avgBlocksDaily;
        // } else if (count == 1) {
        //     delay = avgBlocksDaily / 6;
        // } else {
        //     delay = 0;
        // }
        return delay;

    }
}
