
import {
  AddDrop,Breed, Burn, BuyEgg, Hatch, Mint, Swap,
} from "../generated/ZooKeeper/ZooKeeper"

import { Adddrop,breed,hatch,burn,buyEgg,mint, swap } from "../generated/schema"

export function handleAddDrop(event: AddDrop): void {
  let AddDrop = Adddrop.load(event.transaction.hash.toHex());
  if(AddDrop == null)
    AddDrop = new Adddrop(event.transaction.hash.toHex());

  AddDrop.DropAddress = event.params.dropAddress.toHex();
  AddDrop.Title = event.params.title;
  AddDrop.Eggsupply = event.params.eggSupply;
  AddDrop.save();
}


export function handleBreed(event: Breed): void {
  let Breed = breed.load(event.transaction.hash.toHex());
  if(Breed == null){
    Breed = new breed(event.transaction.hash.toHex());

  Breed.ParentA = event.params.parentA
  Breed.ParentB = event.params.parentB
  Breed.eggId = event.params.eggID
  Breed.save();
  };
}


export function handleBurn(event: Burn): void {
  let Burn = burn.load(event.transaction.hash.toHex());
  if(Burn == null){
    Burn = new burn(event.transaction.hash.toHex());

  Burn.from = event.params.from.toHex()
  Burn.TokenId = event.params.tokenID
  Burn.save();
  };
}

export function handlebuyEgg(event: BuyEgg): void {
  let BuyEgg = buyEgg.load(event.transaction.hash.toHex());
  if(BuyEgg == null){
    BuyEgg = new buyEgg(event.transaction.hash.toHex());

  BuyEgg.from = event.params.from.toHex();
  BuyEgg.eggId = event.params.eggID
  BuyEgg.save();
  };
}
  export function handlehatch(event: Hatch): void {
    let Hatch= hatch.load(event.transaction.hash.toHex());
    if(Hatch == null){
      Hatch = new hatch(event.transaction.hash.toHex());
  
    Hatch.from = event.params.from.toHex();
    Hatch.eggId = event.params.eggID
    Hatch.TokenId = event.params.tokenID
    Hatch.save();
    };
}

export function handleMint(event: Mint): void {
  let Mint= mint.load(event.transaction.hash.toHex());
  if(Mint == null){
    Mint = new mint(event.transaction.hash.toHex());

  Mint.from = event.params.from.toHex()
  Mint.TokenId = event.params.tokenID
  Mint.save();
  };
}

export function handleSwap(event: Swap): void {
  let Swap= swap.load(event.transaction.hash.toHex());
  if(Swap== null){
    Swap = new swap(event.transaction.hash.toHex());

  Swap.Owner = event.params.owner.toHex()
  Swap.tokenId = event.params.tokenID
  Swap.ChainId = event.params.chainID
  Swap.save();
  };
}