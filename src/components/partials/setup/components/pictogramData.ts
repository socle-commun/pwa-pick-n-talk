interface Pictogram {
  id: string;
  name: string;
  category: string;
  emoji: string;
}

export const SAMPLE_PICTOGRAMS: Pictogram[] = [
  { id: "hello", name: "Hello", category: "social", emoji: "👋" },
  { id: "eat", name: "Eat", category: "daily", emoji: "🍽️" },
  { id: "drink", name: "Drink", category: "daily", emoji: "🥤" },
  { id: "happy", name: "Happy", category: "emotions", emoji: "😊" },
  { id: "sad", name: "Sad", category: "emotions", emoji: "😢" },
  { id: "help", name: "Help", category: "needs", emoji: "🆘" },
  { id: "home", name: "Home", category: "places", emoji: "🏠" },
  { id: "school", name: "School", category: "places", emoji: "🏫" },
];

export type { Pictogram };
