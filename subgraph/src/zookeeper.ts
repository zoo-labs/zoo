import {
  AddDrop,
  Breed,
  Burn,
  BuyEgg,
  Hatch,
  Mint,
  Swap,
} from "../types/ZooKeeper/ZooKeeper";

import {
  KeeperAddDrop,
  KeeperBreed,
  KeeperHatch,
  KeeperBurn,
  KeeperBuyEgg,
  KeeperMint,
  KeeperSwap,
} from "../types/schema";

export function handleAddDrop(event: AddDrop): void {
  let addDrop = KeeperAddDrop.load(event.transaction.hash.toHex());
  if (addDrop == null)
    addDrop = new KeeperAddDrop(event.transaction.hash.toHex());

  addDrop.dropAddress = event.params.dropAddress.toHex();
  addDrop.title = event.params.title;
  addDrop.eggSupply = event.params.eggSupply;
  addDrop.save();
}

export function handleBreed(event: Breed): void {
  let breed = KeeperBreed.load(event.transaction.hash.toHex());
  if (breed == null) {
    breed = new KeeperBreed(event.transaction.hash.toHex());

    breed.parentA = event.params.parentA;
    breed.parentB = event.params.parentB;
    breed.eggId = event.params.eggID;
    breed.save();
  }
}

export function handleBurn(event: Burn): void {
  let burn = KeeperBurn.load(event.transaction.hash.toHex());
  if (burn == null) {
    burn = new KeeperBurn(event.transaction.hash.toHex());

    burn.from = event.params.from.toHex();
    burn.tokenId = event.params.tokenID;
    burn.save();
  }
}

export function handlebuyEgg(event: BuyEgg): void {
  let buyEgg = KeeperBuyEgg.load(event.transaction.hash.toHex());
  if (buyEgg == null) {
    buyEgg = new KeeperBuyEgg(event.transaction.hash.toHex());

    buyEgg.from = event.params.from.toHex();
    buyEgg.eggId = event.params.eggID;
    buyEgg.save();
  }
}
export function handlehatch(event: Hatch): void {
  let hatch = KeeperHatch.load(event.transaction.hash.toHex());
  if (hatch == null) {
    hatch = new KeeperHatch(event.transaction.hash.toHex());

    hatch.from = event.params.from.toHex();
    hatch.eggId = event.params.eggID;
    hatch.tokenId = event.params.tokenID;
    hatch.save();
  }
}

export function handleMint(event: Mint): void {
  let mint = KeeperMint.load(event.transaction.hash.toHex());
  if (mint == null) {
    mint = new KeeperMint(event.transaction.hash.toHex());

    mint.from = event.params.from.toHex();
    mint.tokenId = event.params.tokenID;
    mint.save();
  }
}

export function handleSwap(event: Swap): void {
  let swap = KeeperSwap.load(event.transaction.hash.toHex());
  if (swap == null) {
    swap = new KeeperSwap(event.transaction.hash.toHex());

    swap.owner = event.params.owner.toHex();
    swap.tokenId = event.params.tokenID;
    swap.chainId = event.params.chainId;
    swap.save();
  }
}
