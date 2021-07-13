// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "./Animal.sol";
import "./CryptoAnimalAuction.sol";

contract CryptoAnimal is CryptoAnimalAuction {
  event hatched(uint tokenId);

  event newEgg(uint sireId, uint matronId, uint tokenId);

  constructor (string memory name_, string memory symbol_)
    CryptoAnimalAuction(name_, symbol_)
  { }

  function hatch(uint _tokenId)
    external
    payable
    onlyTokenOwner(_tokenId)
    returns (bool)
  {    
    Animal storage animal = animals[_tokenId];

    require(animal.time.eggTime + hatchReadyTime < block.timestamp, "Not ready to hatch");
    require(hatchPrice == msg.value, "Incorrect hatch fee");

    animal.time.hatchTime = block.timestamp;
    
    (bool sent,) = payable(mktsqWallet).call{value: msg.value}("");
    require(sent, "Failed to send ether to mktsq");
    
    emit hatched(_tokenId);
    return true;
  }

  function didHatch(uint _tokenId)
    external
    view
    onlyValidTokenId(_tokenId)
    returns (bool)
  {
    Animal storage animal = animals[_tokenId];
    return animal.time.hatchTime > 0;
  }

  function canBreed(uint _tokenId)
    private
    view
    onlyValidTokenId(_tokenId)
    returns (bool)
  {
    Animal storage animal = animals[_tokenId];
    
    if (animal.time.hatchTime == 0) {
      return false;
    } else if (animal.specie == Specie.MUTANT) {
      return false;
    } else if (animal.breedCount == 0) {
      return true;
    } else {
      uint i = (animal.breedCount > coolDowns.length ? coolDowns.length - 1: animal.breedCount - 1);
      return animal.time.lastBreedTime + coolDowns[i] < block.timestamp;
    }
  }

  function _mixDna(uint _dna1, uint _dna2)
    private
    pure
    returns (uint)
  {
    return _dna1 + _dna2;
  }

  function _breed(uint _matronId, uint _sireId)
    private
    onlyValidTokenId(_matronId)
    onlyValidTokenId(_sireId)
    returns (Animal memory)
  {
    Animal storage matron = animals[_matronId];
    Animal storage sire = animals[_sireId];

    matron.time.lastBreedTime = block.timestamp;
    sire.time.lastBreedTime = block.timestamp;
    matron.breedCount++;
    sire.breedCount++;

    AnimalTime memory time = AnimalTime({
      lastBreedTime: 0,
      hatchTime: 0,
      eggTime: block.timestamp
    });

    Animal memory animal = Animal({
      inBreedMarket: false,
      inMarket: MarketStatus.NONE,
      price: 0,
      breedPrice: 0,
      breedCount: 0,
      dna: _mixDna(matron.dna, sire.dna),
      matronId: _matronId,
      sireId: _sireId,
      generation: uint8(Math.max(matron.generation, sire.generation)),
      time: time,
      specie: matron.specie == sire.specie ? matron.specie : Specie.MUTANT
    });

    return animal;
  }

  function breed(uint _tokenId, uint _partnerId)
    external
    payable
    onlyValidTokenId(_partnerId)
    onlyTokenOwner(_tokenId)
    returns (bool)
  {
    Animal storage animal = animals[_partnerId];
    
    require(animal.inBreedMarket, "Partner animal is not in breed market");
    require(animal.breedPrice == msg.value, "Incorrect breed cost");
    require(canBreed(_tokenId), "Matron can't breed");
    require(canBreed(_partnerId), "Sire can't breed");
    
    Animal memory egg = _breed(_tokenId, _partnerId);
    uint id = _mintToken(msg.sender, egg);

    uint fee = getFeeOf(msg.value);
    (bool sent,) = payable(ownerOf(_partnerId)).call{value: msg.value - fee}("");
    require(sent, "Failed to send ether to animal owner");

    (bool sentMktsq,) = payable(mktsqWallet).call{value: fee}("");
    require(sentMktsq, "Failed to send ether to mktsq");

    emit newEgg(_tokenId, _partnerId, id);
    return true;
  }
}
