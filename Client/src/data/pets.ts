import golden from "@/assets/pet-golden.jpg";
import tabby from "@/assets/pet-tabby.jpg";
import cockatoo from "@/assets/pet-cockatoo.jpg";
import ragdoll from "@/assets/pet-ragdoll.jpg";
import cockatiel from "@/assets/pet-cockatiel.jpg";
import rabbit from "@/assets/pet-rabbit.jpg";
import beagle from "@/assets/pet-beagle.jpg";
import type { DailyBoardData, Pet } from "@/types";

export const petImages = {
  golden,
  tabby,
  cockatoo,
  ragdoll,
  cockatiel,
  rabbit,
  beagle,
};

export const mockPets: Pet[] = [
  {
    id: "milo",
    name: "Milo",
    tagline: "The Dapper Boy",
    description:
      "Voted the softest paw-shake in the neighbourhood. Lives for squeaky toys, treats and sunny naps in Jubilee Hills.",
    owner: "Alex",
    breed: "Golden Retriever",
    type: "Dog",
    city: "Hyderabad",
    country: "India",
    countryCode: "IN",
    image: golden,
    bid: 19500,
    activity: "Active 1 min ago",
    engagement: "10.2M barks",
    views: 14250,
    hallOfFame: true,
    verified: true,
  },
  {
    id: "cleo",
    name: "Cleo",
    tagline: "Mistress of Mischief",
    description:
      "Night zoomer, rule bender, professional cuddler. Has successfully trained two humans and prefers fancy wet food.",
    owner: "Priya",
    breed: "Indian Shorthair",
    type: "Cat",
    city: "Mumbai",
    country: "India",
    countryCode: "IN",
    image: tabby,
    bid: 18700,
    activity: "Active 5 mins ago",
    engagement: "8.9M purrs",
    views: 12890,
    hallOfFame: true,
    verified: true,
  },
  {
    id: "apollo",
    name: "Apollo",
    tagline: "Galaxy Bird",
    description:
      "Sings entire pop choruses, adores disco balls and asks “wanna cracker?” in three languages.",
    owner: "Khalid",
    breed: "Cockatoo",
    type: "Bird",
    city: "Dubai",
    country: "UAE",
    countryCode: "AE",
    image: cockatoo,
    bid: 16200,
    activity: "Active 1 hour ago",
    engagement: "7.5M whistles",
    views: 9410,
    hallOfFame: true,
  },
  {
    id: "mochi",
    name: "Mochi",
    tagline: "King of Naps",
    description:
      "Calm, impossibly fluffy and asleep in every photo ever taken of him. Wakes up only for salmon.",
    owner: "Yuki",
    breed: "Ragdoll Cat",
    type: "Cat",
    city: "Tokyo",
    country: "Japan",
    countryCode: "JP",
    image: ragdoll,
    bid: 12400,
    activity: "Active 12 mins ago",
    engagement: "6.1M purrs",
    views: 8120,
  },
  {
    id: "bruno",
    name: "Bruno",
    tagline: "Fetch Champion",
    description:
      "Chases butterflies with olympic commitment. Belly rubs are a non-negotiable part of his contract.",
    owner: "Shiv",
    breed: "Beagle",
    type: "Dog",
    city: "Bengaluru",
    country: "India",
    countryCode: "IN",
    image: beagle,
    bid: 9800,
    activity: "Active 30 mins ago",
    engagement: "4.4M barks",
    views: 6540,
    isNew: true,
    verified: true,
  },
  {
    id: "sunny",
    name: "Sunny",
    tagline: "The Whistler",
    description:
      "Whistles all day, negotiates head scratches and reviews everyone who walks past the window.",
    owner: "Aditi",
    breed: "Cockatiel",
    type: "Bird",
    city: "Pune",
    country: "India",
    countryCode: "IN",
    image: cockatiel,
    bid: 7300,
    activity: "Active 2 hours ago",
    engagement: "2.8M whistles",
    views: 4320,
    isNew: true,
  },
  {
    id: "pepper",
    name: "Pepper",
    tagline: "Tiny Escape Artist",
    description:
      "Has broken out of four playpens. Carrots are currency and cardboard boxes are a lifestyle.",
    owner: "Marta",
    breed: "Netherland Dwarf",
    type: "Rabbit",
    city: "Lisbon",
    country: "Portugal",
    countryCode: "PT",
    image: rabbit,
    bid: 5100,
    activity: "Active 4 hours ago",
    engagement: "1.6M hops",
    views: 3180,
    isNew: true,
  },
  // Additional mock pets for pagination
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `extra-pet-${i + 1}`,
    name: `Star Pet ${i + 1}`,
    tagline: `Leaderboard Star #${i + 8}`,
    description: `A lovely pet competing for the top spotlight on Pawdium.lol leaderboard.`,
    owner: `User ${i + 1}`,
    breed: i % 3 === 0 ? "Golden Retriever" : i % 3 === 1 ? "Tabby Cat" : "Parakeet",
    type: (i % 3 === 0 ? "Dog" : i % 3 === 1 ? "Cat" : "Bird") as "Dog" | "Cat" | "Bird",
    city: i % 2 === 0 ? "Delhi" : "Osaka",
    country: i % 2 === 0 ? "India" : "Japan",
    countryCode: i % 2 === 0 ? "IN" : "JP",
    image: i % 3 === 0 ? golden : i % 3 === 1 ? tabby : cockatiel,
    bid: 4800 - i * 150,
    activity: `Active ${i + 5} mins ago`,
    engagement: `${(3.5 - i * 0.1).toFixed(1)}M interactions`,
    views: 2800 - i * 90,
    verified: i % 4 === 0,
  })),
];

// Generate entries helper
const createBoardEntries = (seedOffset = 0) => {
  return mockPets.map((pet, index) => ({
    rank: index + 1,
    pet: {
      ...pet,
      bid: Math.max(10, pet.bid - seedOffset * 50 - index * 100),
    },
    bid: Math.max(10, pet.bid - seedOffset * 50 - index * 100),
  }));
};

export const dailyBoards: DailyBoardData[] = [
  {
    date: "2026-08-30",
    label: "August 30, 2026",
    live: true,
    petCount: 32,
    entries: createBoardEntries(0),
  },
  {
    date: "2026-08-29",
    label: "August 29, 2026",
    live: false,
    petCount: 31,
    entries: createBoardEntries(1),
  },
  {
    date: "2026-08-28",
    label: "August 28, 2026",
    live: false,
    petCount: 28,
    entries: createBoardEntries(2),
  },
  {
    date: "2026-08-27",
    label: "August 27, 2026",
    live: false,
    petCount: 30,
    entries: createBoardEntries(3),
  },
  {
    date: "2026-08-26",
    label: "August 26, 2026",
    live: false,
    petCount: 29,
    entries: createBoardEntries(4),
  },
  {
    date: "2026-08-25",
    label: "August 25, 2026",
    live: false,
    petCount: 27,
    entries: createBoardEntries(5),
  },
];
