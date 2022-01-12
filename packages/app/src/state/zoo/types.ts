import { Animal, Egg } from "types";

export interface AnimalState {
    eggs: number
}

export interface ZooState {
    eggs: { [key: string]: Egg }
    animals: { [key: string]: Animal }
    zooBalance: number
    myEggs: { [key: string]: Egg }
    myTransactions: Array<Object>
    myBids: { [key: string]: Egg }
    myAuctions: { [key: string]: Egg }
}