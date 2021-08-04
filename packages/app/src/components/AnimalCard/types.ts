import { Animal } from "entities/zooentities";
import { RarityColor } from "enums/rarity-color";

interface AnimalData extends Animal {
  id: number;
  rarityColor: RarityColor | "white";
}

export interface AnimalCardProps {
  animal: AnimalData;
  animalGroup: {
    [key: string]: number;
  };
  selectedAnimals: Animal[];
  onBreedClick: (animal: Animal) => void;
  onList: (animal: Animal) => void;
  onAction?: () => void;
}

export interface SubAnimalCommonProps {
  onDismiss?: () => void;
  breed?: any;
}

export interface SellConfirmProps extends SubAnimalCommonProps {
  sellAnimal: Animal;
}

export interface BreedConfirmProps extends SubAnimalCommonProps {}
