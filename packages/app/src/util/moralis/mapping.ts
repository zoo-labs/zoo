export function mapEgg(egg) {
  if (!egg.get) egg.get = (k) => egg[k]

  console.log('EGG', egg.tokenID, egg.get('kind'), egg.get('name'))

  return {
    tokenID: egg.get('tokenID'),
    name: egg.get('name'),
    kind: egg.get('kind'),
    type: egg.get('type'),
    animalID: egg.get('animalID'),
    basic: egg.get('type') === 'basic',
    burned: egg.get('burn'),
    hatched: egg.get('hatched'),
    interactive: egg.get('interactive'),
    owner: egg.get('owner'),
    parentA: egg.get('parentA'),
    parentB: egg.get('parentB'),
    timeRemaining: egg.get('timeRemaining'),
    createdAt: egg.get('createdAt'),
    updatedAt: egg.get('updatedAt'),
    CTAOverride: egg.get('CTAOverride'),
  }
}

export function mapAnimal(animal) {
  if (!animal.get) animal.get = (k) => animal[k]

  console.log('ANIMAL', animal.get('tokenID'), animal.get('kind'), animal.get('name'))

  return {
    owner: String(animal.get('owner')),
    tokenID: animal.get('tokenID'),
    name: animal.get('name'),
    description: animal.get('NA'),
    yield: animal.get('yield'),
    boost: animal.get('boost'),
    rarity: animal.get('rarity'),
    dob: animal.get('timestamp'),
    startBid: animal.get('startBid'),
    currentBid: animal.get('currentBid'),
    imageUrl: animal.get('tokenURI'),
    listed: animal.get('listed'),
    bloodline: animal.get('kind') === 1 ? 'pure' : 'hybrid',
    selected: false,
    bred: false,
    breedCount: animal.get('breedCount'),
    kind: animal.get('kind'),
    timeRemaining: animal.get('timeRemaining'),
    CTAOverride: animal.get('CTAOverride'),
    lastBred: animal.get('lastBred'),
    buyNow: animal.get('buyNow'),
    revealed: animal.get('revealed'),
    freed: animal.get('freed'),
  }
}
