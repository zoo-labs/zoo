import { Egg } from 'entities/zooentities'


export interface CardEgg extends Egg {
    id: number
    name: string
 }

export type EggCardType = {
    egg: CardEgg
}