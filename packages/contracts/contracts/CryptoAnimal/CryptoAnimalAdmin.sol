// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./CryptoAnimalBase.sol";
import "./Animal.sol";

contract CryptoAnimalAdmin is CryptoAnimalBase {
  event hatchReadyTimeUpdated(address owner);

  event coolDownUpdated(address owner);

  event hatchPriceUpdated(address owner);

  event mktsqWalletUpdated(address owner);

  event feePercentageUpdated(address owner);

  constructor (string memory name_, string memory symbol_)
    CryptoAnimalBase(name_, symbol_)
  { }

  function setHatchReadyTime(uint _value) external onlyOwner() {
    hatchReadyTime = _value;
    emit hatchReadyTimeUpdated(msg.sender);
  }

  function setCoolDowns(uint[] calldata _value) external onlyOwner() {
    coolDowns = _value;
    emit coolDownUpdated(msg.sender);
  }

  function setHatchPrice(uint _value) external onlyOwner() {
    hatchPrice = uint(_value);
    emit hatchPriceUpdated(msg.sender);
  }

  function setFeePercentage(uint8 _value) external onlyOwner() {
    feePercentage = _value;
    emit feePercentageUpdated(msg.sender);
  }

  function setMktsqWallet(address _value) external onlyOwner() {
    mktsqWallet = _value;
    emit mktsqWalletUpdated(msg.sender);
  }

  function mintToken(address _to, Animal memory _value)
    external
    onlyOwner()
    returns (uint)
  {
    return _mintToken(_to, _value);
  }
}
