export type PetType =
  | "Dog"
  | "Cat"
  | "Bird"
  | "Rabbit"
  | "Hamster"
  | "Guinea Pig"
  | "Fish"
  | "Turtle"
  | "Ferret"
  | "Reptile"
  | "Horse"
  | "Pig"
  | "Snake"
  | "Lizard"
  | "Hedgehog"
  | "Sugar Glider"
  | "Parrot"
  | "Chinchilla"
  | "Amphibian"
  | "Other"
  | string;

export const PET_TYPES: string[] = [
  "Dogs",
  "Cats",
  "Birds",
  "Rabbits",
  "Hamsters",
  "Guinea Pigs",
  "Fish",
  "Turtles",
  "Ferrets",
  "Reptiles",
  "Horses",
  "Pigs",
  "Snakes",
  "Lizards",
  "Hedgehogs",
  "Sugar Gliders",
  "Parrots",
  "Chinchillas",
  "Amphibians",
  "Others",
];

export interface Pet {
  id: string;
  name: string;
  tagline: string;
  description: string;
  owner: string;
  breed: string;
  type: PetType;
  city: string;
  country: string;
  countryCode: string;
  image: string;
  bid: number;
  activity: string;
  engagement: string;
  views?: number;
  isNew?: boolean;
  hallOfFame?: boolean;
  verified?: boolean;
}

export interface Bid {
  petId: string;
  amount: number;
  at: string;
}

export interface DailyEntry {
  rank: number;
  pet: Pet;
  bid: number;
}

export interface DailyBoardData {
  date: string;
  label: string;
  live: boolean;
  petCount: number;
  entries: DailyEntry[];
}

export type FilterKey =
  | "all"
  | "dogs"
  | "cats"
  | "birds"
  | "new"
  | "hall"
  | "country";
