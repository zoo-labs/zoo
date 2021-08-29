import { Animal } from 'types/zoo'
import { RarityColor } from 'enums/rarity-color'

interface AnimalData extends Animal {
  id: number
  rarityColor: RarityColor | 'white'
}

export interface AnimalCardProps {
  animal: AnimalData
  animalGroup: {
    [key: string]: [Animal]
  }
  hybrid: string
  allAnimals: {
    [key: string]: any
  }
  account: string
  executeStackedBreeding: (Animal) => void
  breedClick:(Animal)=>void
}

export interface SubAnimalCommonProps {
  onDismiss?: () => void
  breed: any
}

export interface SellConfirmProps extends SubAnimalCommonProps {
  sellAnimal: Animal
}

export interface BreedConfirmProps extends SubAnimalCommonProps {}
