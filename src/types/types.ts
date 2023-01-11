export type SerializedCard = {
  suit: string;
  face: string;
};

export type SerializedHand = {
  cards: SerializedCard[];
};

export type SerializedPlayer = {
  id: string;
  name: string;
  hand: SerializedHand;
  instance: "AI" | "HUMAN";
};
