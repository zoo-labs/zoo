// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./CryptoAnimalAdmin.sol";
import "./Animal.sol";

contract CryptoAnimalUser is CryptoAnimalAdmin {
  event breedMarketStatusUpdated(address owner);

  event breedPriceUpdated(address owner);

  event marketStatusUpdated(address owner);

  event priceUpdated(address owner);

  constructor (string memory name_, string memory symbol_)
    CryptoAnimalAdmin(name_, symbol_)
  { }

  function setBreedMarketStatus(uint _tokenId, bool _value)
    external
    onlyTokenOwner(_tokenId)
    returns (bool)
  {
    Animal storage animal = animals[_tokenId];
    animal.inBreedMarket = _value;

    emit breedMarketStatusUpdated(msg.sender);
    return true;
  }

  function setBreedPriceUpdated(uint _tokenId, uint _value)
    external
    onlyTokenOwner(_tokenId)
    returns (bool)
  {
    Animal storage animal = animals[_tokenId];
    animal.breedPrice = _value;

    emit breedPriceUpdated(msg.sender);
    return true;
  }

  function setMarketStatus(uint _tokenId, MarketStatus _value)
    external
    onlyTokenOwner(_tokenId)
    returns (bool)
  {
    Animal storage animal = animals[_tokenId];

    require(_value != MarketStatus.AUCTION, "Please initiate auction instead");
    require(animal.inMarket != MarketStatus.AUCTION, "The animal is in auction sale now. Please cancel/end auction first");

    animal.inMarket = _value;

    emit marketStatusUpdated(msg.sender);
    return true; 
  }

  function setPrice(uint _tokenId, uint _value)
    external
    onlyTokenOwner(_tokenId)
    returns (bool)
  {
    Animal storage animal = animals[_tokenId];
    animal.price = _value;

    emit priceUpdated(msg.sender);
    return true;
  }
}
