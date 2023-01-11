import CardInterface from "./CardInterface";

interface DeckInterface {
  shuffle(): void;
  getTopCard(): CardInterface;
  isEmpty(): boolean;
  reset: () => void;

  get cards(): CardInterface[];
}

export default DeckInterface;
