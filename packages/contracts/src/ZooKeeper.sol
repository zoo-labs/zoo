// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;
pragma experimental ABIEncoderV2;

import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { IDrop } from "./interfaces/IDrop.sol";
import { IMedia } from "./interfaces/IMedia.sol";
import { IZoo } from "./interfaces/IZoo.sol";
import { IERC721Burnable } from "./interfaces/IERC721Burnable.sol";
import { IUniswapV2Pair } from "./interfaces/IUniswapV2Pair.sol";
import { IKeeper } from "./interfaces/IKeeper.sol";

interface ICustomDrop{
    function animalStageYields(string memory name) external returns (IZoo.StageYields memory);
}

contract ZooKeeper is Ownable, IZoo, IKeeper {
  using SafeMath for uint256;
  using Counters for Counters.Counter;

  Counters.Counter private dropIDs;
  Counters.Counter private whitelistedCount;

  mapping(uint256 => address) public drops;

  mapping(address => uint256) public dropAddresses;

  mapping(uint256 => IZoo.Token) public tokens;

  mapping(uint256 => uint256) public EggDrop;

  mapping(uint256 => uint256) public feededTimes;

  uint256 public namePrice;
  uint256 public BNBPrice;
  address public BNB;

  IMedia public media;
  IERC20 public zoo;
  IUniswapV2Pair public pair;
  address public bridge;
  bool public unlocked;

  modifier onlyBridge() {
    require(msg.sender == bridge);
    _;
  }

  function configure(
    address _media,
    address _zoo,
    address _pair,
    address _bridge,
    bool _unlocked
  ) public onlyOwner {
    media = IMedia(_media);
    zoo = IERC20(_zoo);
    pair = IUniswapV2Pair(_pair);
    bridge = _bridge;
    unlocked = _unlocked;
  }

  function addDrop(address dropAddress) public onlyOwner returns (uint256) {
    require(dropAddresses[dropAddress] == 0, "Drop already added");
    IDrop drop = IDrop(dropAddress);
    dropIDs.increment();
    uint256 dropID = dropIDs.current();
    drops[dropID] = dropAddress;
    dropAddresses[dropAddress] = dropID;
    emit AddDrop(dropAddress, drop.title(), drop.totalSupply());
    return dropID;
  }

  function setNamePrice(uint256 price) public onlyOwner {
    namePrice = price.mul(10**18);
  }


  function setBNBPrice(uint256 price) public onlyOwner {
    BNBPrice = price;
  }

  function setBNB(address _bnb) public onlyOwner {
    BNB = _bnb;
  }

  function mint(address owner, IZoo.Token memory token) private returns (IZoo.Token memory) {
    token = media.mintToken(owner, token);
    tokens[token.id] = token;
    emit Mint(owner, token.id);
    return token;
  }

  function burn(address owner, uint256 tokenID) private {
  
    media.burnToken(owner, tokenID);
    tokens[tokenID].meta.burned = true;
    emit Burn(owner, tokenID);
  }

  function swap(
    address owner,
    uint256 tokenID,
    uint256 chainId
  ) external onlyBridge {

    burn(owner, tokenID);
    tokens[tokenID].meta.swapped = true;
    emit Swap(owner, tokenID, chainId);
  }

  function remint(
    address owner,
    IZoo.Token calldata token
  ) external onlyBridge {
    mint(owner, token);
  }

  function mintEgg(uint256 eggId, uint256 dropID, address owner) internal returns (IZoo.Token memory) {
    IDrop drop = IDrop(drops[dropID]);
    IZoo.Token memory egg = drop.newEgg(eggId);

    egg = mint(owner, egg);
    EggDrop[egg.id] = eggId;

    emit BuyEgg(owner, egg.id);
    return egg;
  }

   function buyEggsWithBNB(uint256 eggId, uint256 dropID, uint256 quantity) public {

    // Ensure enough BNB was sent
    require(IERC20(BNB).balanceOf(msg.sender) >= (BNBPrice * quantity), "Not enough BNB");

    for (uint8 i = 0; i < quantity; i++) {
      mintEgg(eggId, dropID, msg.sender);
    }

    IERC20(BNB).transferFrom(msg.sender, address(this), BNBPrice);
  }

   function buyEggsBNB(uint256 eggId, uint256 dropID, uint256 quantity) public payable {

    // Ensure enough BNB was sent
    IDrop drop = IDrop(drops[dropID]);
    uint256 bnbPrice = (drop.eggPrice(eggId) + (18000 * (10 ** 18))) / zooPriceBNB(); // 420k ZOO in BNB
    require(msg.value >= bnbPrice * quantity, "Not enough BNB");

    for (uint8 i = 0; i < quantity; i++) {
      mintEgg(eggId, dropID, msg.sender);
    }
  }


  function buyEgg(uint256 eggId,uint256 dropID, address buyer) private returns (IZoo.Token memory) {

    IDrop drop = IDrop(drops[dropID]);
    uint256 price = drop.eggPrice(eggId);

    zoo.transferFrom(buyer, address(this), price);

    return mintEgg(eggId, dropID, buyer);
  }

  function buyEggs(uint256 eggId, uint256 dropID, uint256 quantity) public {
    IDrop drop = IDrop(drops[dropID]);
    uint256 price = drop.eggPrice(eggId);
    require(zoo.balanceOf(msg.sender) >= price * quantity, "Not enough ZOO");
    for (uint8 i = 0; i < quantity; i++) {
      buyEgg(eggId, dropID, msg.sender);
    }
  }

  function dropEggs(uint256 eggId, uint256 dropID,address buyer) override public {
    IDrop drop = IDrop(drops[dropID]);
    require(msg.sender == drop.EggDropAddress(), "wrong egg dropper");
    mintEgg(eggId, dropID, buyer);
  }

  function hatchEgg(uint256 dropID, uint256 eggID) public returns (IZoo.Token memory) {
    IDrop drop = IDrop(drops[dropID]);
    uint256 price = drop.eggPrice(EggDrop[eggID]);
    require(zoo.balanceOf(msg.sender) >= price, "Not enough ZOO");
    require(unlocked, "Game is not unlocked yet");
    require(media.tokenExists(eggID), "Egg is burned or does not exist");
    require(media.ownerOf(eggID) == msg.sender, "Not owner of EGG");

    IZoo.Token memory animal = getAnimal(dropID, eggID);
    animal.meta.eggID = eggID;
    animal.meta.dropID = dropID;
    animal.dropEgg = EggDrop[eggID];

    animal = mint(msg.sender, animal);

    zoo.transferFrom(msg.sender, address(this), price);

    burn(msg.sender, eggID);

    emit Hatch(msg.sender, eggID, animal.id);
    return animal;
  }


  function feedAnimal (uint256 animal, uint256 dropID) public {
    require(tokens[animal].kind != IZoo.Type.BASE_EGG || tokens[animal].kind != IZoo.Type.HYBRID_EGG, "token not animal");
    IDrop drop = IDrop(drops[dropID]);
    uint256 price = drop.eggPrice(tokens[animal].dropEgg);
    require(zoo.balanceOf(msg.sender) >= price, "Not enough ZOO");
    IZoo.Token storage token = tokens[animal];

    if(tokens[animal].stage == IZoo.AdultHood.BABY){
      token.stage = IZoo.AdultHood.TEEN;
    }
    else if(tokens[animal].stage == IZoo.AdultHood.TEEN){
      token.stage = IZoo.AdultHood.ADULT;
    }
    feededTimes[tokens[animal].id] += 1;
    IMedia.MediaData memory newData = drop.getAdultHoodURIs(token.name, token.stage);
    token.data = newData;
    media.updateTokenURI(token.id, newData.tokenURI);
    media.updateTokenMetadataURI(token.id, newData.metadataURI);
    zoo.transferFrom(msg.sender, address(this), price);
    tokens[animal] = token;
  }

  modifier canBreed(uint256 parentA, uint256 parentB) {

    require(media.tokenExists(parentA) && media.tokenExists(parentB), "Non-existent token");
    require((media.ownerOf(parentA) == msg.sender && media.ownerOf(parentB) == msg.sender), "Not owner of Animals");
    require(keccak256(abi.encode(parentA)) != keccak256(abi.encode(parentB)), "Not able to breed with self");
    require(breedReady(parentA) && breedReady(parentB), "Wait for cooldown to finish.");
    require(isBaseAnimal(parentA) && isBaseAnimal(parentB), "Only BASE_ANIMAL can breed.");
    require(isAnimalAdult(parentA) && isAnimalAdult(parentB), "Only Adult animals can breed.");
    require(keccak256(abi.encodePacked(tokens[parentA].name)) == keccak256(abi.encodePacked(tokens[parentB].name)), "Only same breed can be bred");
    _;
  }

  function breedAnimals(
    uint256 dropID,
    uint256 tokenA,
    uint256 tokenB
  ) public canBreed(tokenA, tokenB) returns (IZoo.Token memory) {

    IDrop drop = IDrop(drops[dropID]);

    if(tokens[tokenA].dropEgg == drop.silverEgg() || tokens[tokenB].dropEgg == drop.silverEgg()){
      drop.changeRandomLimit(4);
    }

    IZoo.Token memory egg = IDrop(drops[dropID]).newHybridEgg(IZoo.Parents({ animalA: tokens[tokenA].name, animalB: tokens[tokenB].name, tokenA: tokenA, tokenB: tokenB }));

    uint256 price;

    if(drop.eggPrice(tokens[tokenA].dropEgg) > drop.eggPrice(tokens[tokenB].dropEgg)){
      price = drop.eggPrice(tokens[tokenA].dropEgg);
    }
    else{
      price = drop.eggPrice(tokens[tokenB].dropEgg);
    }

    require(zoo.balanceOf(msg.sender) >= price, "Not enough ZOO");

    zoo.transferFrom(msg.sender, address(this), price);

    updateBreedDelays(tokenA, tokenB);

    egg = mint(msg.sender, egg);
    emit BreedAnimal(msg.sender, tokenA, tokenB, egg.id);
    drop.changeRandomLimit(3);
    return egg;
  }

  function freeAnimal(uint256 dropID, uint256 tokenID) public returns (uint256 yields) {

    IZoo.Token storage token = tokens[tokenID];

    burn(msg.sender, tokenID);

    uint256 blockAge = block.number - token.birthValues.birthday;
    uint256 daysOld = blockAge.div(28800);

    if(token.stage == IZoo.AdultHood.BABY){
      yields = daysOld.mul(ICustomDrop(drops[dropID]).animalStageYields(token.name).baby.yields.mul(10**18));
    }
    else if(token.stage == IZoo.AdultHood.TEEN){
      daysOld.mul(ICustomDrop(drops[dropID]).animalStageYields(token.name).teen.yields.mul(10**18));
    } else{
      daysOld.mul(ICustomDrop(drops[dropID]).animalStageYields(token.name).adult.yields.mul(10**18));
    }

    zoo.transfer(msg.sender, yields);

    emit Free(msg.sender, tokenID, yields);

    return yields;
  }

  function buyName(uint256 tokenID, string memory customName) public {
    require(zoo.balanceOf(msg.sender) >= namePrice, "ZK: Not enough ZOO to purchase Name");

    zoo.transferFrom(msg.sender, address(this), namePrice);

    IZoo.Token storage token = tokens[tokenID];
    token.customName = customName;
    tokens[tokenID] = token;
  }

  function isBaseAnimal(uint256 tokenID) private view returns (bool) {
    return tokens[tokenID].kind == IZoo.Type.BASE_ANIMAL;
  }

   function isAnimalAdult(uint256 tokenID) private view returns (bool) {
    return tokens[tokenID].stage == IZoo.AdultHood.ADULT;
  }

  function getAnimal(uint256 dropID, uint256 eggID) private view returns (IZoo.Token memory) {

    IZoo.Token storage egg = tokens[eggID];
    IDrop drop = IDrop(drops[dropID]);

    if (egg.kind == IZoo.Type.BASE_EGG) {
      return drop.getRandomAnimal(drop.unsafeRandom(), egg.dropEgg);
    } else {
      return drop.getBredAnimal(tokens[egg.birthValues.parents.tokenA].name, egg.birthValues.parents);
    }
  }

  function updateBreedDelays(uint256 parentA, uint256 parentB) private {

    tokens[parentA].breed.count++;
    tokens[parentB].breed.count++;
    tokens[parentA].breed.timestamp = block.timestamp;
    tokens[parentB].breed.timestamp = block.timestamp;
  }

  function breedNext(uint256 tokenID) public view returns (uint256) {
    IZoo.Token storage token = tokens[tokenID];
    return token.breed.timestamp + (token.breed.count * 1 days);
  }

  function breedReady(uint256 tokenID) public view returns (bool) {
    if (tokens[tokenID].breed.count == 0) {
      return true;
    }
    if (block.timestamp > breedNext(tokenID)) {
      return true;
    }

    return false;
  }


  function zooPriceBNB() public view returns (uint256) {
    (uint zooAmount, uint bnbAmount,) = pair.getReserves();
    return zooAmount / bnbAmount;
  }

  function supplyBNB() public view returns (uint256) {
    return zoo.balanceOf(address(this));
  }

  function supplyZOO() public view returns (uint256) {
    return zoo.balanceOf(address(this));
  }

  function withdrawBNB(address payable receiver, uint256 amount) public onlyOwner {
    require(receiver.send(amount));
  }

  function withdrawZOO(address receiver, uint256 amount) public onlyOwner {
    require(zoo.transfer(receiver, amount));
  }

  function mul(uint x, uint y) internal pure returns (uint z) {
    require(y == 0 || (z = x * y) / y == x, "Math overflow");
  }

  // Payable fallback functions
}
