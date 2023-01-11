import { SerializedHand } from "./../types/types";
import CardInterface from "./CardInterface";
import Serializable from "./Serializable";

interface HandInterface extends Serializable {
  addCard(card: CardInterface): void;
  getPossibleCardValues(): number[];
  serialize: () => SerializedHand;
  get cards(): CardInterface[];
}

export default HandInterface;
