export interface Animal {
  owner?: string
  kind?: number
  tokenID: number
  parentA?: number
  parentB?: number
  name: string
  description: string
  yield: number
  boost: number
  rarity: string
  dob: number
  startBid?: number
  currentBid?: number
  buyNow?: number
  imageUrl: string
  listed: boolean
  bloodline?: string
  selected?: boolean
  bred?: boolean
  breedCount?: number
  timeRemaining?: number
  CTAOverride?: any
  lastBred?: string
  revealed?: boolean
  freed?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface Egg {
  owner: string
  kind: number
  tokenID: number
  parentA?: number
  parentB?: number
  basic: boolean
  timeRemaining?: number
  CTAOverride?: any
  burned?: boolean
  interactive?: boolean
  hatched?: boolean
  animalID?: number
  createdAt?: Date
  updatedAt?: Date
}
