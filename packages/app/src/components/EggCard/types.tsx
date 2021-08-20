import { Egg } from 'types/zoo'

export interface CardEgg extends Egg {
  id: number
  name: string
}

export type EggCardType = {
  egg: CardEgg
  hatchEgg: (egg) => void
  hatchEggReady: (egg) => void
  hatching?: boolean
  // eggGroup: {BASIC: number, HYBRID: number}
}
